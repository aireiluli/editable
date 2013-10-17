## 说明

editable可以让一些元素变成可编辑的状态

* 版本：1.0
* 作者：kissy-team
* demo：[http://gallery.kissyui.com/editable/1.0/demo/index.html](http://gallery.kissyui.com/editable/1.0/demo/index.html)

## 组件特色

* 支持任意自定义元素替换文本


## 初始化组件

```javascript
    KISSY.use('gallery/editable/1.0/index', function (S, Editable) {
         var editable = new Editable('#test');

         //TODO
    });
```

## API说明

### 初始化参数

* el {String|HtmlElement} 目标对象，可以是dom或者kissy选择器
* config {Object} 配置参数
	* editEvent: {String} 触发编辑的事件，默认click
    * submitEvent {String} 触发编辑完成的事件，默认blur
    * type {String} 编辑生成的编辑框表单类型(text or textarea)，默认text
    * editClass {String} 可以附加到编辑表单上的样式
    * editTarget {String|HtmlElement} 用于自定义编辑替换元素，如果定义了editTarget，submitEvent、type的值都将不起作用

### 实例方法

* submit 当定义了editTarget时可用，用于编辑完成后将值传回组件，便于写入文本节点

### 可用事件

* targetReady target已经生成完毕后触发的事件，只会触发一次，用于初始化元素绑定事件
    * ev.editTarget 当前替换文本的编辑元素
    * ev.srcNode 旧元素
* beforeEdit 每次点击文本触发的事件
	* ev.oldValue 旧值
	* ev.srcNode 旧元素
* aftereSubmit 每次编辑完成后触发的事件
	* ev.newValue 新值