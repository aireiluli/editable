/**
 * @fileoverview 
 * @author kissy-team<kissy-team@gmail.com>
 * @module editable
 **/
KISSY.add(function (S, D, E) {

    var defaultConfig = {
        editEvent: 'click',
        submitEvent: 'blur', //blur,click
        type: 'text', //text, textarea
        editClass: ''
    };


    function Editable(el, config) {
        var self = this,
            cfg = S.merge(defaultConfig, config);

        el = S.all(el);

        if(el.length) {
            S.each(el, function(el) {
                self._init(el, cfg);
            });
        } else {
            self._init(el, cfg);
        }
    }

    var CACHE = {},
        CACHE_KEY = 'ks-editable-cache';


    S.augment(Editable, {
        _init: function(el, cfg) {

            if(!el) return;

            el = S.one(el);

            var self = this, target;

            //for cache
            el.attr(CACHE_KEY, S.guid());

            E.on(el, cfg.editEvent || 'click', function(ev) {
                

                if(CACHE[el.attr(CACHE_KEY)]) {
                    target = CACHE[el.attr(CACHE_KEY)];
                } else {
                    if(cfg.editTarget) {
                        target = S.all(cfg.editTarget);

                        cfg.editClass && D.addClass(target, cfg.editClass);
                    } else if(cfg.type == 'textarea') {
                        target = D.create('<textarea class="' + cfg.editClass + '"></textarea');
                    } else {
                        target = D.create('<input type="'+cfg.type+'" class="' + cfg.editClass + '" />');
                    }

                    CACHE[el.attr(CACHE_KEY)] = target;

                    D.insertAfter(target, el);

                    if(cfg.editTarget) {
                        self.submit = function(newValue) {
                            el.html(newValue).show();
                            D.hide(target);
                            
                            self.fire('afterSubmit', {
                                newValue: newValue
                            });
                        }
                    } else {
                        E.on(target, cfg.submitEvent || 'blur', function(e) {
                            el.html(D.val(target)).show();
                            D.hide(target);

                            self.fire('afterSubmit', {
                                newValue: D.val(target)
                            });
                        });
                    }

                    self.fire('targetReady', {
                        editTarget: target,
                        srcNode: el
                    });
                }

                
                D.hide(el);

                self.fire('beforeEdit', {
                    oldValue: el.html(),
                    srcNode: el
                });

                if(cfg.editTarget) {
                    D.show(target);
                } else {
                    D.val(target, D.html(el));
                    D.show(target);
                    target.focus();
                }
                    
            });
 
        }

    });

    S.augment(Editable, S.EventTarget);

    return Editable;
}, {
    requires:[
        'dom',
        'event'
    ]
});