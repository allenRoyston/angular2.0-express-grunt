// core
import {Component, Input, Output, EventEmitter, ElementRef}    from 'angular2/core';
import {CORE_DIRECTIVES}     from 'angular2/common';


// directives

// parts

// declare

declare var $;
declare var Object;
declare var _root;
declare var THREE;
//------------------------------------
@Component({
  selector: 'three-js',
  directives: [CORE_DIRECTIVES],
  template: `
    <canvas></canvas>
  `
})
export class ThreeComponent {

  //--------------
  public globals = _root.globals;
  public self:any;
  public selfRef:any;


  // send data to a listener
  //this.threeObj.emit({message: "Sent from child!"})
  @Output() three = new EventEmitter();
  //@ExportObj() threeJS = new EventEmitter();

  // recieve information from parent
  /*
    // create observable - watches for change
    t._fromParent.execute = function(d){
      this.new = JSON.stringify(d);
      if(this.old !== this.new){
          // do something
          this.old = this.new;
      }
    }
    // set timeout and run to initalize
    setInterval(function(){
      t._fromParent.execute(t.fromParent);
    }, 100);
    t._fromParent.execute(t.fromParent);

  */
  @Input() settings:any;
  @Input() layout:any;
   public _layout = {old: null, new: null, execute: null}

   //--------------
   constructor(private el: ElementRef) {
      this.selfRef = el.nativeElement;
      var t = this;
   }
   //--------------

  //--------------
  ngOnInit(){
    var t = this;

    // load Threejs
    if($('[src="' + t.settings.file + '"]').length == 0){
      var js = document.createElement("script");
          js.type = "text/javascript";
          js.src = t.settings.file;
          document.body.appendChild(js);
          js.onload = function(){
              t.initThreejs()
          }
    }
    // if threeJS already exists, but needs to be checked for it to be loaded
    else{
      function scriptLoadedTest(){
        setTimeout(function(){
          try {
              var test = new THREE.Scene();
              clearInterval(this)
          }
          catch(err) {}
          finally{
              if(test != undefined){
                t.initThreejs();
              }
              else{
                scriptLoadedTest()
              }
          }
        }, 1)
      }
      var intv = scriptLoadedTest();

    }

    /*
    // create observable - watches for change
    t._layout.execute = function(d){
      this.new = JSON.stringify(d);
      if(this.old !== this.new){
          t.executeInstructions(d);
          this.old = this.new;
      }
    }
    // set timeout and run to initalize
    setInterval(function(){
      t._layout.execute(t.layout);
    }, 100);
    t._layout.execute(t.layout);
    */

  }
  //--------------

  //--------------
  initThreejs(){
    this.three.emit({container: this.selfRef.getElementsByTagName('canvas')})
  }
  //--------------


}
//------------------------------------
