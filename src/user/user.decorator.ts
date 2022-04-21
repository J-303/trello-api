import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const User = createParamDecorator((data, context: ExecutionContext) => {
    const require = context.switchToHttp().getRequest();
    return data ? require.user[data] : require.user;
});