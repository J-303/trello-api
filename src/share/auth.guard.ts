import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common"
import * as jwt from "jsonwebtoken";

//TODO: сделай авторизацию по документации nestjs
@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean>
    {
        const request = context.switchToHttp().getRequest();
        if (request) {
            if (!request.headers.authorization) {
                return false;
            }
            request.user = await this.validateToken(request.headers.authorization);
            return true;
        }
        return false;
    }
    
    async validateToken(auth: string) {
        if (auth.split(' ')[0] != 'Bearer') {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        const token = auth.split(' ')[1];
        try {
            const decoded: any = jwt.verify(token, '123');
            return decoded;
        } catch (error) {
            const msg = 'Token error: ' + error.message + error.name;
            throw new HttpException(msg, HttpStatus.UNAUTHORIZED);
        }
    }
}