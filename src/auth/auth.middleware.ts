import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserSession } from '../app.controller';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!(<UserSession>req.session).user)
      throw new UnauthorizedException('Not authenticated');
    next();
  }
}
