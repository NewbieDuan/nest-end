import { Body, Controller, HttpException, HttpStatus, Post, ForbiddenException } from '@nestjs/common';
import { HomeService } from "./home.service";

@Controller('home')
export class HomeController {
    constructor(private readonly homeService: HomeService) { }
    @Post('getFileList')
    getFileList(@Body() body: Record<string, string>) {

        return this.homeService.getFileList(body)
    }
    @Post('getFileTypeList')
    getFileTypeList() {
        return this.homeService.getFileTypeList()
    }
    @Post('deleteFile')
    deleteFile(@Body() body) {
        return this.homeService.deleteFile(body.id)
    }
}
