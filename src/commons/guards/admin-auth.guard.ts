import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/role.enum';
import { User } from '../../modules/auth/entities/user.entity';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

    const role = this.reflector.get<Role[]>('roles', context.getHandler());
    if (!role) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const admin: User = req.user;
    if (admin) {
      const hasRole = () => admin.roles.some(role => role === Role.ADMIN);
      if (hasRole()) {
        return true;
      } else return false;
    } else {
      return false;
    }

  }
}
