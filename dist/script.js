/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ufos = document.querySelectorAll('.ufo');
var cows = document.querySelectorAll('.cow');
var wrappers = document.querySelectorAll('.wrapper');
var startBtn = document.querySelector('button');
var easyBtn = document.querySelector('#easy');
var mediumBtn = document.querySelector('#medium');
var hardBtn = document.querySelector('#hard');
var scoreBox = document.querySelector('.score');
var minNumAnimals = 3;
var abducted = [];
var lastCow = void 0;
var score = 0;
var bestScore = 0;
var rndNum = void 0;
var interval = null;
easyBtn.addEventListener('click', easyLevel);
mediumBtn.addEventListener('click', mediumLevel);
hardBtn.addEventListener('click', hardLevel);
startBtn.addEventListener('click', function () {
  startAbduction();
});

function easyLevel() {
  wrappers.forEach(function (w) {
    w.classList.remove('medium');
    w.classList.remove('hard');
  });
  bestScore = 0;
  minNumAnimals = 3;
  startAbduction();
}

function mediumLevel() {
  wrappers.forEach(function (w) {
    w.classList.remove('hard');
    w.classList.add('medium');
  });
  bestScore = 0;
  minNumAnimals = 4;
  startAbduction();
}

function hardLevel() {
  wrappers.forEach(function (w) {
    w.classList.add('hard');
  });
  bestScore = 0;
  minNumAnimals = 5;
  startAbduction();
}

function startAbduction() {
  clearInterval(interval);
  wrappers.forEach(function (w) {
    w.classList.remove('abduction');
  });
  cows.forEach(function (cow) {
    cow.classList.remove('visible');
  });
  cows.forEach(function (cow) {
    cow.classList.add('visible');
  });
  abducted = [];
  score = 0;
  scoreBox.textContent = 'Min animals: ' + minNumAnimals + ' / Score: ' + score + ' / Best: ' + bestScore;

  interval = setInterval(abduct, 1300);
  var timeout = null;
  function abduct() {
    if (abducted.length === cows.length - minNumAnimals) {
      console.log('clear');
      clearInterval(interval);
      return;
    }

    rndNum = Math.floor(Math.random() * cows.length);
    if (abducted.includes(rndNum) || rndNum === lastCow) {
      console.log('include');
      abduct();
      return;
    }
    lastCow = rndNum;
    cows[rndNum].parentElement.classList.add('abduction');
    console.log('addClass');
    abducted.push(rndNum);
  }
}

ufos.forEach(function (ufo) {
  return ufo.addEventListener('click', shoot);
});
function shoot() {
  var _this = this;

  score++;
  score > bestScore ? bestScore = score : bestScore = bestScore;
  scoreBox.textContent = 'Min animals: ' + minNumAnimals + ' / Score: ' + score + ' / Best: ' + bestScore;
  this.parentElement.classList.remove('abduction');
  this.classList.add('hit');
  var index = abducted.indexOf(rndNum);
  abducted.splice(index, 1);
  setTimeout(function () {
    _this.classList.remove('hit');
  }, 650);
}

/***/ })
/******/ ]);