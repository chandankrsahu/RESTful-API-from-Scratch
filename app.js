const mongoose = require('mongoose');
const express=require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
mongoose.connect('mongodb://localhost:27017/wikiDB', {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const wikiSchema={
	title:String,
	content:String
}

const Article =mongoose.model("Article",wikiSchema);
/////////////Complete Articles//////////////////////////////////
app.route("/articles")
.get(function(req,res){
	Article.find(function(err,x){
		res.send(x);
	});
	
})
.post(function(req,res){
	const x=(req.body.title);
	const y=(req.body.content);

	const x1=new Article({
		title:x,content:y
	});
	x1.save();
})
.delete(function(req,res){

	Article.deleteMany(function(err){
		if(err)
			console.log(err);
		else console.log("Successsfully deleted every articles");
	});
});

//////////////////////Specific Article////////////////////////////////

app.route("/articles/:kuch")
	.get(function(req,res){
		Article.findOne({title:req.params.kuch},function(err,x){
			if(x)
				res.send(x);
			else console.log("Not Found");
		});
	})


	.put(function(req,res){
		Article.update(
			{title:req.params.kuch},
			{title:req.body.title,content:req.body.content},
			{overwrite:true},
			function(err){
				if(err)
					console.log(err);
				else res.send("Successsfully Updated");
			});
	})


	.patch(function(req,res){
		Article.update(
			{title:req.params.kuch},
			{$set:req.body},
			function(err){
				if(err)
					res.send(err);
				else res.send("Successsfully Patched");
			});
	})

	.delete(function(req,res){
		Article.deleteOne({title:req.params.kuch},function(err){
			if(err)
				res.send(err);
			else res.send("Successsfully deleted the article");
		});
	});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
