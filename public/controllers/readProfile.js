require('templates');

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