const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('sass', function () {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', function () {
    gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
});

gulp.task('default', gulp.series('sass', 'watch'));
module.exports = function (grunt) {
    require('time-grunt')(grunt);
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });

    grunt.initConfig({
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: ['*.scss'],
                    dest: 'css',
                    ext: '.css'
                }]
            }
        },

        watch: {
            files: ['css/*.scss'],
            tasks: ['css']
        },

        browserSync: {
            dev: {
                bsFiles: {//ARCHIVOS BROWSER 
                    src: [
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                    ]
                },

                options: {
                    watchTask: true,
                    server: {
                        baseDir: './' //DIRECTORIO BASE PARA NUESTRO SERVIDOR
                    }
                }
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: './',
                    src: 'img-hoteles/*.{png,git,jpg,jpeg}',
                    dest: 'dist/'
                }]
            }
        },

        copy: {
            html: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: './',
                    src: '*.html',
                    dest: 'dist'
                }]
            },

            fonts: {
                files: [{
                    //FOR FONT-AWESOME
                    expand: true,
                    dot: true,
                    cwd: 'node_modules/open-iconic/font',
                    src: ['fonts/*.*'],
                    dest: 'dist'
                }]
            }
        },

        clean: {
            build: {
                src: ['dist/']
            }
        },

        cssmin: {
            dist: {}
        },

        uglify: {
            dist: {}
        },

        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 20 //DIRECTORIO BASE PARA NUESTRO SERVIDOR
            },

            release: {
                //filerev: release hashes all assets (images, js and css)
                // in dist directory
                files: [{
                    src: [
                        'dist/js/*.js',
                        'dist/css/*.css',
                    ]
                }]
            }
        },

        concat: {
            options: {
                separator: ';'
            },
            dist: {}
        },

        useminPrepare: {
            foo: {
                dest: 'dist',
                src: ['index.html', 'about.html', 'precios.html', 'contacto.html', 'terminos-condiciones.html']
            },

            options: {
                flow: {
                    steps: {
                        css: ['cssmin'],
                        js: ['uglify']
                    },

                    post: {
                        css: [{
                            name: 'cssmin',
                            createConfig: function (context, block) {
                                var generated = context.options.generated;
                                generated.options = {
                                    keepSpecialComments: 0,
                                    rebase: false
                                }
                            }
                        }]
                    }
                }
            }
        },

        usemin: {
            html: ['dist/index.html', 'dist/about.html', 'dist/precios.html', 'dist/contacto.html', 'dist/terminos-condiciones.html'],
            options: {
                assetsDir: ['dist', 'dist/css', 'dist/js']
            }
        }

    });

    grunt.registerTask('css', ['sass']);
    grunt.registerTask('default', ['browserSync', 'watch']);
    grunt.registerTask('img:compress', ['imagemin']);
    grunt.registerTask('build', [
        'clean',
        'copy',
        'imagemin',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin'
    ])
};