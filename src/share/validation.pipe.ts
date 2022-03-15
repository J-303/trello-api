import { Injectable, ArgumentMetadata, PipeTransform, HttpException, HttpStatus } from "@nestjs/common";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";

@Injectable()
export class ValidationPipe implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata) {
        if (value instanceof Object && this.isEmpty(value)) {
            throw new HttpException(
                'Validation failed: Empty body',
                HttpStatus.BAD_REQUEST
            );
        }
        
        const { metatype } = metadata;
        if (!metatype || ! this.toValidate(metatype)) {
            return value;
        }
        
        const obj = plainToClass(metatype, value);
        const errors = await validate(obj);
        if (errors.length > 0) {
            throw new HttpException(
                `Validation failed: ${this.formatError(errors)}`,
                HttpStatus.BAD_REQUEST
            );
        }
        return value;
    }
    
    private toValidate(metatype): boolean {
        const types = [String, Boolean, Number, Array, Object];
        return !types.find(type => metatype === type);
    }
    
    private formatError(errors: any[]) {
        return errors.map(
            err => {
                for (let prop in err.constraints) {
                    return err.constraints[prop];
                }
            }).join('; ');
    }
    
    private isEmpty(value: any) {
        if (Object.keys(value).length > 0) {
            return false;
        }
        return true;
    }
}