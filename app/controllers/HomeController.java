package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import models.User;
import models.UserType;
import play.data.DynamicForm;
import play.data.FormFactory;
import play.libs.Json;
import play.mvc.*;

import views.html.*;

import javax.inject.Inject;
import java.util.Date;
import java.util.List;
import java.util.UUID;

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
        User user = User.find.where().eq("authToken", request().getHeader("AUTHORIZATION")).findUnique();
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        if(user==null){
            node.put("message", "Not logged in");
            return ok(node);
        }
        if(!requestData.get("username").equals("") && !requestData.get("password").equals("") && !requestData.get("position").equals("") ){
            User checker = User.find.where().eq("user", requestData.get("username")).findUnique();
            UserType check = user.getPosition();
            UserType checker2 = UserType.find.where().eq("typeName", requestData.get("position")).findUnique();
            if(checker==null && checker2 != null && check.getTypeName().equals("admin")){
                if(requestData.get("position").equals("admin") || requestData.get("position").equals("manager") || requestData.get("position").equals("employee")){
                    User L = new User();
                    L.setUser(requestData.get("username"));
                    L.setPosition(checker2);
                    L.setPassword(requestData.get("password"));
                    L.setCreatedBy(user);
                    L.setIsdeleted(false);
                    L.setAddedDate(new Date());
                    String authToken = UUID.randomUUID().toString();
                    User checker3 = User.find.where().eq("authToken", authToken).findUnique();
                    while(checker3 != null){
                        authToken = UUID.randomUUID().toString();
                        checker3 = User.find.where().eq("authToken", authToken).findUnique();
                    }
                    L.setAuthToken(authToken);
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

    public Result retrieveUsers(Integer pagenumber) {
        User user = User.find.where().eq("authToken", request().getHeader("AUTHORIZATION")).findUnique();
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        if(user==null){
            node.put("message", "Not logged in");
            return ok(node);
        }

        UserType check = user.getPosition();
        int first = pagenumber * 10;
        if(check.getTypeName().equals("admin")){
            List<User> users = User.find.where().ne("isdeleted", true).setFirstRow(first).setMaxRows(10).findList();
            return ok(Json.toJson(users));
        }else{
            node.put("message", "not authorized to access");
        }
        return ok(node);
    }

    public Result editUser(Integer x) {
        DynamicForm requestData = formFactory.form().bindFromRequest();
        User user = User.find.where().eq("authToken", request().getHeader("AUTHORIZATION")).findUnique();
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        if(user==null){
            node.put("message", "Not logged in");
            return ok(node);
        }
        UserType check = user.getPosition();
        UserType checker2 = UserType.find.where().eq("typeName", requestData.get("position")).findUnique();
        if(check.getTypeName().equals("admin") && checker2 != null){
            User toedit = User.find.byId(x);
            if(toedit.getIsdeleted() == false && !requestData.get("username").equals("") && !requestData.get("password").equals("") && (requestData.get("position").equals("admin") || requestData.get("position").equals("employee") || requestData.get("position").equals("manager"))){
                node.put("message", "successfully edited");
                toedit.setUser(requestData.get("username"));
                toedit.setPassword(requestData.get("password"));
                toedit.setPosition(checker2);
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
        User user = User.find.where().eq("authToken", request().getHeader("AUTHORIZATION")).findUnique();
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        if(user==null){
            node.put("message", "Not logged in");
            return ok(node);
        }
        UserType check = user.getPosition();
        if(check.getTypeName().equals("admin")){
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
        User user = User.find.where().eq("authToken", request().getHeader("AUTHORIZATION")).findUnique();
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        if(user==null){
            node.put("message", "Not logged in");
            return ok(node);
        }
        node.put("message", "user found");
        node.put("user", Json.toJson(user));
        return ok(node);
    }

    public Result getSpecificUser(Integer x) {
        User user = User.find.where().eq("authToken", request().getHeader("AUTHORIZATION")).findUnique();
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        if(user==null){
            node.put("message", "Not logged in");
            return ok(node);
        }
        UserType check = user.getPosition();
        if(check.getTypeName().equals("admin")){
            User toOpen = User.find.where().eq("id", x).ne("isDeleted", true).findUnique();
            if(toOpen != null){
                node.put("message", "user found");
                node.put("user", Json.toJson(toOpen));
            }else{
                node.put("message", "user not found");
            }
        }else{
            node.put("message", "not authorized");
        }
        return ok(node);
    }


    public Result getSpecificName(String x) {
        User user = User.find.where().eq("authToken", request().getHeader("AUTHORIZATION")).findUnique();
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        if(user==null){
            node.put("message", "Not logged in");
            return ok(node);
        }
        UserType check = user.getPosition();
        if(check.getTypeName().equals("admin")){
            List<User> toOpen = User.find.where().contains("user", x).ne("isDeleted", true).findList();
            if(toOpen != null){
                return ok(Json.toJson(toOpen));
            }else{
                node.put("message", "user not found");
            }
        }else{
            node.put("message", "not authorized");
        }
        return ok(node);
    }
}
