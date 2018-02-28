import React, { Component } from 'react';
import './Section.css';
import 'prismjs';
import 'prismjs/themes/prism.css';

class Section extends Component {

  constructor() {
    super();
    this.state = {
      modules: [
        {
          'variable': 'gulp',
          'npm': 'gulp'
        },
        {
          'variable': 'concat',
          'npm': 'gulp-concat'
        },
        {
          'variable': 'sass',
          'npm': 'gulp-sass'
        },
        {
          'variable': 'browserify',
          'npm': 'browserify'
        },
        {
          'variable': 'browserSyncLib',
          'npm': 'browser-sync'
        },
        {
          'variable': 'uglify',
          'npm': 'gulp-uglify'
        },
        {
          'variable': 'source',
          'npm': 'vinyl-source-stream'
        },
        {
          'variable': 'buffer',
          'npm': 'vinyl-buffer'
        }
      ],
      css: {
        src: './src/_styles',
        dest: './dist/styles'
      },
      js: {
        src: './src/_scripts',
        dest: './dist/scripts'
      },
      browsersync: './dist'
    }
  }

  renderStrict() {
    return this.props.strict ? `'use strict';` : '';
  }

  renderImports() {
    let modules = '';
    this.state.modules.forEach((module, index, array) => {
      if (this.state.es6) {
        modules += `var ${module.variable} = require'${module.npm}');\n`;
      } else {
        modules += `import ${module.variable} from '${module.npm}';\n`;
      }
    });
    return modules.slice(0, -1);
  }

  renderGulpTasks() {
    return `\
gulp.task('serve', [
  'sass',
  'scripts',
  'browser-sync'
]);

gulp.task('sass', function() {
  return gulp.src('${this.state.css.src}')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('${this.state.css.dest}'));
});

gulp.task('scripts', () => {
  return gulp.src('${this.state.js.src}/**/*.js')
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('${this.state.js.src}'));
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: '${this.state.browsersync}'
    }
  });
});\
    `;
  }

  // Terrible indentation is required for <pre><code> to output properly
  render() {
    return (
      <div className="section">
        <h1 onClick={this.props.onIncrement}>{this.props.store}</h1>
        <div>
          <span>package.json</span>
          <pre><code className="language-json">{`\
{
  "name": "newproject",
  "version": "1.0.0",
  "description": "Generated by https://github.com/mjlai3/gulpfile-generator",
  "main": "index.js",
  "scripts": {
    "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "browser-sync": "^2.23.6",
    "gulp": "^3.9.1",
    "gulp-concat": "^2.6.1",
    "gulp-sass": "^3.1.0",
    "gulp-uglify": "^3.0.0",
    "vinyl-buffer": "^1.0.1",
    "vinyl-source-stream": "^2.0.0"
  }
}\
          `}</code></pre>
        </div>

        <div>
          <span>{this.state.es6 ? 'gulpfile.babel.js' : 'gulpfile.js'}</span>
          <pre><code className="language-javascript">{`\
${this.renderStrict()}

let browserSync = browserSyncLib.create();

${this.renderImports()}

${this.renderGulpTasks()}\
          `}</code></pre>
        </div>

        <div className={this.state.es6 ? '' : 'hidden'}>
          <span>.babelrc</span>
          <pre><code className="language-javascript">{`\
{
  "presets": ["es2015"]
}\
          `}</code></pre>
        </div>
      </div>

    );
  }
}

export default Section;
