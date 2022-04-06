import { createParamDecorator, ExecutionContext } from "@nestjs/common";

//TODO: лучше вынести куда-нибудь в common, т.к. будет использоваться в разных модулях
export const User = createParamDecorator((data, context: ExecutionContext) => {
    const require = context.switchToHttp().getRequest();
    return data ? require.user[data] : require.user;
});