import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Servicio. / Service.
import { ProductService } from './product.service';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

// DTOs.
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    // Controlador para crear producto. / Controller for creating products.
    @Post()
    create(@Body() dto: CreateProductDto) {
        return this.productService.create(dto);
    }

    // Controlador para listar todos los productos. / Controller to list all products.
    @Get()
    findAll() {
        return this.productService.findAll();
    }

    // Controlador para buscar producto por ID. / Controller to search for product by ID.
    @Get(':id_product')
    findOne(@Param('id_product', ParseIntPipe) id_product: number) {
        return this.productService.findOne(id_product);
    }

    // Controlador para actualizar producto. / Controller for updating products.
    @Patch(':id_product')
    update(
        @Param('id_product', ParseIntPipe) id_product: number,
        @Body() dto: UpdateProductDto,
    ) {
        return this.productService.update(id_product, dto);
    }

    // Controlador para eliminar producto. / Controller to delete product.
    @Delete(':id_product')
    remove(@Param('id_product', ParseIntPipe) id_product: number) {
        return this.productService.remove(id_product);
    }
}
