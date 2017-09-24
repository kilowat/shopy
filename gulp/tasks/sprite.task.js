import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

import config from '../config';
import path from '../path';
import { errorHandler } from '../helpers';

const $ = gulpLoadPlugins({
  pattern: ['browser-sync', 'gulp-*', 'gulp.spritesmith', 'vinyl-ftp'],
});

/**
 * Sprite task
 * @class sprite
 */
class Sprite {

    /**
     * Build your template
     * @returns {*}
     */
    static build() {
                let spriteData = gulp.src(path.all.sprite)
                  //.pipe($.plumber(config.plumber))
                  .pipe($.browserSync.stream())
                  .pipe($.spritesmith(config.sprite));

                  spriteData.img.pipe($.if(config.build.type === "ftp", $.vinylFtp.create(config.ftp.conf).dest(path.dest.publicDir)));
                  spriteData.img.pipe($.if(config.build.type === "local", gulp.dest(path.dest.images)));

                return spriteData.css.pipe(gulp.dest(path.dest.spriteScss));

    }
}

export default Sprite;
