import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, Max, Min } from 'class-validator';

export enum ProductSortBy {
  RECOMMENDED = 'recommended',
  PRICE_ASC = 'price-asc',
  PIRCE_DESC = 'price-desc',
}

export class GetProductsDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsEnum(ProductSortBy)
  sort?: ProductSortBy;
}
