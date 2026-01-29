import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ProductSortBy } from './get-products.dto';
import { Type } from 'class-transformer';

export class SearchProductDto {
  @IsString()
  @IsOptional()
  productName?: string;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  categoryIds?: string[];

  @IsEnum(ProductSortBy)
  @IsOptional()
  sortBy?: ProductSortBy;

  @IsNumber()
  @Min(1)
  @Max(100)
  @IsOptional()
  @Type(() => Number)
  limit?: number;
}
