YUI.add("tictac-att-compose",function(a){a.mix(a.config.groups.tictacs.modules,{"tictac-attach-main":{path:a.Tictac.base.getAssetURL("b.js","tictac-att-compose")},"tictac-attach-templates":{path:a.Tictac.base.getAssetURL("tictac-attach-templates_"+NeoConfig.lang+".js","tictac-att-compose")},"tictac-attach-strings":{path:a.Tictac.base.getAssetURL("strings/lang_"+NeoConfig.lang+".js","tictac-att-compose")}}),a.namespace("Tictac.att-compose").loader=function(){},a.one("head").append('<link rel="stylesheet" href="'+a.Tictac.base.getAssetURL("css/att-compose.css","tictac-att-compose",!0)+'" />')},"1.0.0",{requires:["tictac-base","tictac-att"]});