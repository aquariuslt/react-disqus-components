"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var EMPTY_DISQUS_CONFIG = {
    identifier: '',
    url: '',
    shortname: ''
};
var DISQUS_INSTANCE = 'DISQUS';
var DISQUS_CONFIG = 'disqus_config';
var DISQUS_SHORTNAME = 'disqus_shortname';
var DISQUS_THREAD = 'disqus_thread';
var DISQUS_COMMENT_ELEMENT_ID = 'dsq-embed-scr';
exports.Comment = function (props) {
    var disqusConfig = props || EMPTY_DISQUS_CONFIG;
    var insertScript = function (src, id, parentElement) {
        var script = window.document.createElement('script');
        script.async = true;
        script.src = src;
        script.id = id;
        parentElement.appendChild(script);
        return script;
    };
    var removeScript = function (id, parentElement) {
        var script = window.document.getElementById(id);
        if (script) {
            parentElement.removeChild(script);
        }
    };
    var getDisqusConfig = function () {
        return function () {
            this.page.identifier = disqusConfig.identifier;
            this.page.url = disqusConfig.url;
            this.page.title = props.title;
        };
    };
    var loadInstance = function () {
        if (!document.getElementById(DISQUS_COMMENT_ELEMENT_ID) && disqusConfig.shortname) {
            window[DISQUS_CONFIG] = getDisqusConfig();
            window[DISQUS_SHORTNAME] = disqusConfig.shortname;
            insertScript("https://" + disqusConfig.shortname + ".disqus.com/embed.js", DISQUS_COMMENT_ELEMENT_ID, document.body);
        }
        else {
            if (window[DISQUS_INSTANCE]) {
                window[DISQUS_INSTANCE].reset({
                    reload: true,
                    config: getDisqusConfig()
                });
            }
        }
    };
    var cleanInstance = function () {
        if (window[DISQUS_INSTANCE] && document.getElementById(DISQUS_COMMENT_ELEMENT_ID)) {
            window[DISQUS_INSTANCE].reset();
            window[DISQUS_INSTANCE] = undefined;
            removeScript(DISQUS_COMMENT_ELEMENT_ID, document.body);
            var disqusThread = document.getElementById(DISQUS_THREAD);
            if (disqusThread) {
                while (disqusThread.hasChildNodes() && disqusThread.firstChild) {
                    disqusThread.removeChild(disqusThread.firstChild);
                }
            }
        }
    };
    react_1.useEffect(function () {
        loadInstance();
        return cleanInstance;
    }, [props]);
    return React.createElement("div", { id: DISQUS_THREAD });
};
//# sourceMappingURL=index.js.map