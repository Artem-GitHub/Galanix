
const {src, dest} = require("gulp");
const  gulp = require("gulp");
const  browserSync = require("browser-sync").create();
const  fileInclude = require("gulp-file-include");
const  scss = require("gulp-sass");
const  autoprefixer = require("gulp-autoprefixer");
const  groupMedia = require("gulp-group-css-media-queries");
const  cleanCss = require("gulp-clean-css");
const  uglify = require("gulp-uglify-es").default;
const  imagemin = require("gulp-imagemin");
const  rename = require("gulp-rename");
const babel = require("gulp-babel");



const distFolder = "public";
const srcFolder = "src";

const path = {

	build: {
		html: distFolder + "/",
		css: distFolder + "/css/",
		js: distFolder + "/scripts/",
		img: distFolder + "/img/",
		fonts: distFolder + "/fonts/"
	},

	src: {
		html: [srcFolder + "/*.html", "!" + srcFolder + "/_*.html"],
		css: srcFolder + "/scss/*.scss",
		js: srcFolder + "/scripts/script.js",
		img: srcFolder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
		fonts: srcFolder + "/fonts/*.{ttf,otf,woff,woff2}"
	},

	watch: {
		html: srcFolder + "/**/*.html",
		css: srcFolder + "/scss/**/*.scss",
		js: srcFolder + "/scripts/**/*.js",
		img: srcFolder + "/img/**/*.{jpg,png,svg,gif,ico,webp}"
	},
	clean: "./" + srcFolder + "/"
};

function browSync(params) {
	browserSync.init({
		server: {
			baseDir: "./" + distFolder + "/",
			index: 'index.html'
		},
		port: 3000,
		notify: false
	});
};

function html() {
	return src(path.src.html)
		.pipe(fileInclude())
		.pipe(dest(path.build.html))
		.pipe(browserSync.stream())
};

function css() {
	return src(path.src.css)
		.pipe(scss({
			outputStyle: "expanded"
		}))
		.pipe(groupMedia())
		.pipe(autoprefixer({
			overrideBrowserslist: ["last 10 versions"],
			cascade: true
		}))
		.pipe(dest(path.build.css))
		.pipe(cleanCss())
		.pipe(rename({
			extname: ".min.css"
		}))
		.pipe(dest(path.build.css))
		.pipe(browserSync.stream())
};

function js() {
	return src(path.src.js)
		.pipe(fileInclude())
		.pipe(babel({
			presets: ['@babel/preset-env']
		}))
		.pipe(dest(path.build.js))
		.pipe(uglify())
		.pipe(rename({
			extname: ".min.js"
		}))
		.pipe(dest(path.build.js))
		.pipe(browserSync.stream())
};

function images() {
	return src(path.src.img)
		.pipe(dest(path.build.img))
		.pipe(src(path.src.img))
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{ removeViewBox: false }],
			interlaced: true,
			optimizationLevel: 3
		}))
		.pipe(dest(path.build.img))
		.pipe(browserSync.stream())
};

function fonts() {
	return src(path.src.fonts)
		.pipe(dest(path.build.fonts))
		.pipe(browserSync.stream())
};

function watchFiles(params) {
	gulp.watch([path.watch.html], html);
	gulp.watch([path.watch.css], css);
	gulp.watch([path.watch.js], js);
	gulp.watch([path.watch.img], images);
};

let build = gulp.series(gulp.parallel(css, html, js, images, fonts));
let watch = gulp.parallel(build, watchFiles, browSync);

exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.scss = scss;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;