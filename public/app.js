(function() {

Ember.TEMPLATES["templates/readProfile"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [3,'>= 1.0.0-rc.4'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashContexts, hashTypes, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n					<div class=\"company\"><strong>Company:</strong>&nbsp;");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "controller.linkedInUserProfile.company", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n				");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n					<div class=\"company\"><strong>Company:</strong>&nbsp;");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "controller.fbUserProfile.company", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n				");
  return buffer;
  }

  data.buffer.push("<div class=\"container container_16 clearfix\">\n	<div class=\"grid_16\">\n		<label class=\"inputFieldLabel\">Input Field:</label>\n		");
  hashContexts = {'valueBinding': depth0,'id': depth0,'class': depth0};
  hashTypes = {'valueBinding': "STRING",'id': "STRING",'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("controller.inputTextValue"),
    'id': ("readProfileInput"),
    'class': ("inputField")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n	</div>\n\n	<div class=\"linkedInContainer\">\n		<div class=\"heading\">LinkedIn Profile</div>\n		<div class=\"inProfile\">\n			<img ");
  hashContexts = {'src': depth0};
  hashTypes = {'src': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'src': ("controller.linkedInUserProfile.photoURL")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"photo\">\n			<div class=\"rightHalf\">\n				<div class=\"name\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "controller.linkedInUserProfile.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n				<div class=\"location\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "controller.linkedInUserProfile.location", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n				");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "controller.linkedInUserProfile.company", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n			</div>\n		</div>\n	</div>\n	<div class=\"facebookContainer\">\n		<div class=\"heading\">Facebook Profile</div>\n		<div class=\"fbProfile\">\n			<img ");
  hashContexts = {'src': depth0};
  hashTypes = {'src': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'src': ("controller.fbUserProfile.photoURL")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"photo\">\n			<div class=\"rightHalf\">\n				<div class=\"name\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "controller.fbUserProfile.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n				<div class=\"location\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "controller.fbUserProfile.location", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n				");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "controller.fbUserProfile.company", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n			</div>\n		</div>\n	</div>\n</div>");
  return buffer;
  
});

})();

(function() {

BTS = Ember.Application.create({});

BTS.ReadProfileController = Ember.Controller.create({
	users:[],
	fbUserProfile:Ember.Object.create(),
	linkedInUserProfile:Ember.Object.create(),
	inputTextValue:"",

	initialise:function(){
		var self = this;
	},

	fbWithUserName:function(keyword){
		var url = "https://graph.facebook.com/" + keyword +"?fields=id,name,location,work,picture&access_token=" + BTS.AccessToken,
			img_url = "https://graph.facebook.com/" + keyword +'/picture/',
			self = this;

		$.ajax({
			url:url,
			success:function(data){
				if(Ember.empty(data.error)){
					$(".fbProfile").show();
					self.get("fbUserProfile").set("name",data.name);
					if(!Ember.empty(data.location)){
						self.get("fbUserProfile").set("location",data.location.name);
					}
					else{
						self.get("fbUserProfile").set("location","");						
					}
					if(!Ember.empty(data.work)){
						self.get("fbUserProfile").set("company",data.work[0].employer.name);
					}
					else{
						self.get("fbUserProfile").set("company","");
					}
					self.get("fbUserProfile").set("photoURL",img_url);
				}
			},
			error:function(){
				$(".fbProfile").hide();
				self.set("fbUserProfile",Ember.Object.create());
			}
		});
	},

	fbWithSearch:function(keyword){
		var url = "https://graph.facebook.com/search?q=" + keyword + "&type=user&access_token=" + BTS.AccessToken,
			self = this;
		$.ajax({
			url:url,
			success:function(result){
				self.get("users").clear();
				result.data.forEach(function(obj){
					self.get("users").pushObject({"value":obj.name,"label":obj.name + "(Facebook)","id":obj.id,"fromFB":true});
				});
				self.linkedInWithSearch(keyword);				
			}
		});

	},

	linkedInWithUserName:function(keyword, isUserName){
		var self = this,
			keywordToSearch;

		if(isUserName){
			keywordToSearch = "url=http://www.linkedin.com/in/"+keyword;
		}
		else{
			keywordToSearch = keyword;
		}
		
		IN.API.Profile(keywordToSearch).fields("id", "firstName", "lastName","location","positions","picture-url").result(
		function(data){
			if(!Ember.empty(data.values)){
				$(".inProfile").show();
				self.get("linkedInUserProfile").set("name",data.values[0].firstName + " " + data.values[0].lastName);
				if(!Ember.empty(data.values[0].location)){
					self.get("linkedInUserProfile").set("location",data.values[0].location.name);
				}
				if(!Ember.empty(data.values[0].positions)){
					self.get("linkedInUserProfile").set("company",data.values[0].positions.values[0].company.name);
				}
				self.get("linkedInUserProfile").set("photoURL",data.values[0].pictureUrl);
			}
			else{
				$(".inProfile").hide();
				self.set("linkedInUserProfile",Ember.Object.create());
			}
		});
	},

	linkedInWithSearch:function(keyword){
		var self = this;
		IN.API.PeopleSearch().fields("firstName", "lastName", "id").params({"keywords":keyword, "count": 20, "sort": "distance"}).result(
		function(data){
			if(!Ember.empty(data.people.values)){
				data.people.values.forEach(function(obj){
					self.get("users").pushObject({"value":obj.firstName +" "+obj.lastName,"label":obj.firstName +" "+obj.lastName + "(LinkedIn)", "id":obj.id, "fromFB":false});
				});
			}

			//Initialize the autocomplete now
			$("#readProfileInput").autocomplete({
		  		source: self.get("users"),
		  		select: function( event, ui ) {
		  			var id = ui.item.id,
		  				from = ui.item.fromFB;
		  			if(from){
		  				self.fbWithUserName(id);
		  			}
		  			else{
		  				self.linkedInWithUserName(id,false);
		  			}
		  		}
			});
			$( "#readProfileInput" ).on( "autocompletesearch", function( event, ui ) {} );
			$("#readProfileInput").autocomplete("search");
			/*var fbIcon = "<img class='icon-image' src='images/icon_small_fb.png'>";
			$(".ui-menu-item").append(fbIcon);*/
		});
	},

	search:function(){
		var keyword = this.get("inputTextValue");
		//For Facebook
		if(!Ember.empty(keyword.trim())){
			this.fbWithUserName(keyword);
			this.fbWithSearch(keyword);
			this.linkedInWithUserName(keyword,true);			
		}

	}.observes("inputTextValue")

});

BTS.ReadProfileView = Ember.View.create({
    templateName:"templates/readProfile",
    controllerBinding:"BTS.ReadProfileController",

    didInsertElement:function(){
      this.get("controller").initialise();
      $(".signInDiv").removeClass("signInDivVisible");
    }

});

})();