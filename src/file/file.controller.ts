import { Controller, Body, Post, Req, StreamableFile, Res } from '@nestjs/common';
import { FileService } from "./file.service";
import { Request, Response } from 'express';
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';


@Controller('file')
export class FileController {
    constructor(private readonly fileService: FileService) { }
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    upload(@UploadedFile() file: Express.Multer.File, @Body() body) {
        return this.fileService.upload(file, body);


    }
    @Post('getFileList')
    getFileList(@Body() body: Record<string, string>) {
        return 'getFileList'
    }
    @Post('download')
    download(@Body() body: Record<'id', number>, @Res() res: Response) {
        return this.fileService.download(body.id, res);
    }
}
