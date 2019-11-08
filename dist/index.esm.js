import { useEffect, createElement } from 'react';

var EMPTY_DISQUS_CONFIG = {
    identifier: '',
    url: '',
    shortname: ''
};
var DISQUS_INSTANCE = 'DISQUS';
var DISQUS_CONFIG = 'disqus_config';
var DISQUS_SHORTNAME = 'disqus_shortname';
var Comment = function (props) {
    var disqusConfig = props || EMPTY_DISQUS_CONFIG;
    var disqusCommentElementId = 'dsq-embed-scr';
    var insertScript = function (src, id, parentElement) {
        var script = window.document.createElement('script');
        script.async = true;
        script.src = src;
        script.id = id;
        parentElement.appendChild(script);
        return script;
    };
    var getDisqusConfig = function () {
        return function () {
            this.page.identifier = disqusConfig.identifier;
            this.page.url = disqusConfig.url;
            this.page.title = props.title;
        };
    };
    var loadInstance = function () {
        if (!document.getElementById(disqusCommentElementId) && disqusConfig.shortname) {
            window[DISQUS_CONFIG] = getDisqusConfig();
            window[DISQUS_SHORTNAME] = disqusConfig.shortname;
            insertScript("https://" + disqusConfig.shortname + ".disqus.com/embed.js", disqusCommentElementId, document.body);
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
    useEffect(function () {
        loadInstance();
    }, [props]);
    return createElement("div", { id: "disqus_thread" });
};

export { Comment };
//# sourceMappingURL=index.esm.js.map
