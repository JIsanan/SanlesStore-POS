package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import models.User;
import play.data.DynamicForm;
import play.data.FormFactory;
import play.libs.Json;
import play.mvc.*;

import views.html.*;

import javax.inject.Inject;
import java.util.Date;
import java.util.List;

public class HomeController extends Controller {
    private final FormFactory formFactory;

    @Inject
    public HomeController(final FormFactory formFactory) {
        this.formFactory = formFactory;
    }

    public Result login(){
        DynamicForm requestData = formFactory.form().bindFromRequest();
        User users = User.find.where().eq("user", requestData.get("username")).findUnique();
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        if(users != null && users.getPassword().equals(requestData.get("password")) && users.getIsdeleted() == false){
            session().clear();
            session("user", users.getUser());
            node.put("message", "login successful");
            node.put("user", Json.toJson(users));
        }else{
            node.put("message", "invalid credentials");
        }
        return ok(node);
    }

    public Result logout(){
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        session().clear();
        node.put("message", "successfully logged out");
        return ok(node);
    }

    public Result createUser(){
        DynamicForm requestData = formFactory.form().bindFromRequest();
        User user = User.find.where().eq("user", session().get("user")).findUnique();
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        if(!requestData.get("username").equals("") && !requestData.get("password").equals("") && !requestData.get("position").equals("") && user.getPosition().equals("admin")){
            User checker = User.find.where().eq("user", requestData.get("username")).findUnique();
            if(checker==null){
                if(requestData.get("position").equals("admin") || requestData.get("position").equals("user")){
                    User L = new User();
                    L.setUser(requestData.get("username"));
                    L.setPosition(requestData.get("position"));
                    L.setPassword(requestData.get("password"));
                    L.setCreatedBy(user);
                    L.setIsdeleted(false);
                    L.setAddedDate(new Date());
                    node.put("message", "user created successfully");
                    L.save();
                }else{
                    node.put("message", "user can only be admin or user");
                }
            }else{
                node.put("message", "username exists already");
            }
        }else{
            node.put("message", "incorrect information inputted");
        }
        return ok(node);
    }

    public Result retrieveUsers() {
        List<User> users = User.find.all();
        JsonNode userlist = Json.toJson(users);
        return ok(userlist);
    }

    public Result editUser(Integer x) {
        DynamicForm requestData = formFactory.form().bindFromRequest();
        User user = User.find.where().eq("user", session().get("user")).findUnique();
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        if(user.getPosition().equals("admin")){
            User toedit = User.find.byId(x);
            if(toedit.getIsdeleted() == false && !requestData.get("username").equals("") && !requestData.get("password").equals("") && (requestData.get("position").equals("admin") || requestData.get("position").equals("user"))){
                node.put("message", "successfully edited");
                toedit.setUser(requestData.get("username"));
                toedit.setPassword(requestData.get("password"));
                toedit.setPosition(requestData.get("position"));
                toedit.setUpdatedBy(user);
                toedit.setUpdatedDate(new Date());
                toedit.update();
            }else{
                node.put("message", "information inputted maybe lacking or incorrect");
            }
        }else{
            node.put("message", "not authorized to edit");
        }
        return ok(node);
    }

    public Result deleteUser(Integer x) {
        DynamicForm requestData = formFactory.form().bindFromRequest();
        User user = User.find.where().eq("user", session().get("user")).findUnique();
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        if(user.getPosition().equals("admin")){
            User toedit = User.find.byId(x);
            if(toedit.getIsdeleted() == false){
                node.put("message", "successfully deleted");
                toedit.setIsdeleted(true);
                toedit.setUpdatedBy(user);
                toedit.setUpdatedDate(new Date());
                toedit.update();
            }else{
                node.put("message", "user already deleted");
            }
        }else{
            node.put("message", "not authorized to delete");
        }
        return ok(node);
    }

    public Result getUser() {
        User user = User.find.where().eq("user", session().get("user")).findUnique();
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        if(user != null){
            node.put("message", "user found");
            node.put("user", Json.toJson(user));
        }else{
            node.put("message", "not found");
        }
//        ObjectNode node = JsonNodeFactory.instance.objectNode();
//        node.put("x", 224);
//        node.put("username", 500);
//  List<User> users = User.find.where().eq("user", requestData.get("username")).setMaxRows(1).findList();
//        user.setUser("owner");
//        user.update();
        return ok(node);
    }
}
