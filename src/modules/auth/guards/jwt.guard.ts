import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";


@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        // console.log('JwtGuard canActivate');
        return super.canActivate(context);
    }

    handleRequest(err, user, info) {
        // console.log('JwtGuard handleRequest');
        if (err || !user) {
            console.log('JwtGuard error or no user');
            throw err || new UnauthorizedException();
        }
        return user;
    }
}