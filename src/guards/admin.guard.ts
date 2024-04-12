// admin.guard.ts

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Logic to determine if the user is an admin
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Assuming the user object contains role information

    return user.role === 'admin'; // Check if user has admin role
  }
}
