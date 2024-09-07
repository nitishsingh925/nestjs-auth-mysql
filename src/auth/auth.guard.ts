import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.getTokenFromRequest(request);

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      request['user'] = payload; // Attach user payload to request
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private getTokenFromRequest(request: Request): string | undefined {
    // Check token from cookie or Authorization header
    const cookieToken = request.cookies?.access_token;
    const headerToken = this.extractTokenFromHeader(request);
    // Return the first non-null token
    return cookieToken || headerToken;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    if (!authHeader) return undefined;

    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
