angular.module('playground').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('public/directives/ff-content/template.html',
    "<div ng-if=cview.isImage><img ng-src={{cview.content.link}} alt=\"{{cview.content.name}}\"></div><div ng-if=cview.isVideo><img ng-if=cview.thumbnail ng-src={{cview.content.thumbnail}} alt=\"{{cview.content.title}}\"><iframe ng-if=!cview.thumbnail src={{cview.content.embed}} frameborder=0></iframe></div>"
  );


  $templateCache.put('public/directives/ff-content-box/template.html',
    "<div class=ffContentBox ng-class=\"{expanded: cc.expanded, isQuestion: cc.isQuestion, flagged: cc.isFlagged}\"><collapse expanded=cc.expanded><ff-content content=cc.content class=full thumbnail=false></ff-content></collapse><div class=desc ng-class=\"{nothumb: !cc.showThumbnail}\"><ff-content ng-if=cc.showThumbnail class=thumb content=cc.content thumbnail=true></ff-content><div class=meta ng-click=cc.onToggle()><h3 ng-bind=cc.content.text ng-if=cc.content.text></h3><h3 ng-bind=cc.content.filename ng-if=\"cc.content.filename && !cc.content.text\"></h3><h3 ng-bind=cc.content.title ng-if=cc.content.title></h3><h5 ng-if=cc.content.channelTitle>Posted by <span ng-bind=cc.content.channelTitle></span></h5><div class=bottomrow><p ng-bind=cc.content.filename class=filename ng-if=\"cc.content.filename && cc.content.text\"></p><p ng-if=cc.content.replies><span ng-bind=cc.content.replies.length></span> <span ng-bind=\"cc.content.replies.length != 1 ? ' Replies': ' Reply'\"></span></p><cite>- <span ng-bind=cc.content.submitter.name></span></cite></div></div><collapse expanded=cc.expanded ng-if=cc.isQuestion class=replies><ff-question ng-repeat=\"reply in cc.content.replies\" content=reply is-reply=true></ff-question><div ng-if=cc.isForm class=ffQuestion ng-class=\"{reply: isReply}\"><div class=\"editor u-full-width\" ng-class=\"{invalid: !cc.replyValid}\"><textarea class=u-full-width placeholder=\"Reply to this question\" ng-model=cc.replyContent></textarea></div><button class=u-full-width ng-click=\"cc.onReply({data: cc.replyContent}); cc.replyContent = '';\">REPLY</button></div></collapse></div><collapse expanded=cc.expanded><div class=commands><div class=action ng-click=cc.upvoteContent()><img src=/images/Actions-ThumbsUp.svg alt=Upvote><p><b ng-bind=cc.content.upvotes></b> Upvotes</p></div><div class=action ng-click=cc.flagContent()><img src=/images/Actions-Flag.svg alt=Flag><p>Flag Content</p></div><div class=action ng-hide=cc.isQuestion ng-click=cc.shareContent()><img src=/images/Actions-Share.svg alt=Share><p>Share</p></div></div></collapse></div>"
  );


  $templateCache.put('public/directives/ff-question/template.html',
    "<div class=ffQuestion ng-class=\"{reply: isReply}\"><h3 ng-bind=content.text></h3><p><span ng-bind=content.upvotes></span> Upvotes</p><cite>- <span ng-bind=content.submitter.name></span></cite></div>"
  );

}]);
