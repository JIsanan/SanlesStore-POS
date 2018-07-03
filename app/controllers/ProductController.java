package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import models.Product;
import models.ProductType;
import models.User;
import play.data.DynamicForm;
import play.data.FormFactory;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

import javax.inject.Inject;
import java.util.Date;
import java.util.List;

public class ProductController extends Controller {
    private final FormFactory formFactory;

    @Inject
    public ProductController(final FormFactory formFactory) {
        this.formFactory = formFactory;
    }

    public Result createProduct(){
        DynamicForm requestData = formFactory.form().bindFromRequest();
        User user = User.find.where().eq("authToken", request().getHeader("AUTHORIZATION")).findUnique();
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        if(user.getPosition().equals("admin") || user.getPosition().equals("manager")){
            ProductType typecheck = ProductType.find.where().eq("id", requestData.get("type_id")).ne("isdeleted", true).findUnique();
            Product checker = Product.find.where().eq("name", requestData.get("product_name")).findUnique();
            if(checker==null && typecheck!=null && Integer.parseInt(requestData.get("price")) > 0){
                Product L = new Product();
                L.setName(requestData.get("product_name"));
                L.setType(typecheck);
                L.setCreatedBy(user);
                L.setIsdeleted(false);
                L.setPrice(Integer.parseInt(requestData.get("price")));
                L.setAddedDate(new Date());
                node.put("message", "product created successfully");
                L.save();
            }else{
                node.put("message", "product exists already or product type does not exist or price is an incorrect value");
            }
        }else{
            node.put("message", "not authorized to add productType");
        }
        return ok(node);
    }


    public Result editProduct(Integer x) {
        DynamicForm requestData = formFactory.form().bindFromRequest();
        User user = User.find.where().eq("authToken", request().getHeader("AUTHORIZATION")).findUnique();
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        if(user.getPosition().equals("admin") || user.getPosition().equals("manager")){
            ProductType typecheck = ProductType.find.where().eq("id", requestData.get("type_id")).ne("isdeleted", true).findUnique();
            Product checker = Product.find.byId(x);
            if(checker.getIsdeleted() == false && !requestData.get("product_name").equals("") && Integer.parseInt(requestData.get("price")) > 0 && typecheck!=null){
                node.put("message", "successfully edited");
                checker.setName(requestData.get("product_name"));
                checker.setUpdatedBy(user);
                checker.setType(typecheck);
                checker.setPrice(Integer.parseInt(requestData.get("price")));
                checker.setUpdatedDate(new Date());
                checker.update();
            }else{
                node.put("message", "information inputted maybe lacking or incorrect");
            }
        }else{
            node.put("message", "not authorized to edit");
        }
        return ok(node);
    }


    public Result deleteProduct(Integer x) {        User user = User.find.where().eq("authToken", request().getHeader("AUTHORIZATION")).findUnique();
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        if(user==null){
            node.put("message", "Not logged in");
            return ok(node);
        }
        DynamicForm requestData = formFactory.form().bindFromRequest();
        if(user.getPosition().equals("admin") || user.getPosition().equals("manager")){
            Product checker = Product.find.byId(x);
            if(checker.getIsdeleted() == false){
                node.put("message", "successfully deleted");
                checker.setIsdeleted(true);
                checker.setUpdatedBy(user);
                checker.setUpdatedDate(new Date());
                checker.update();
            }else{
                node.put("message", "product already deleted");
            }
        }else{
            node.put("message", "not authorized to delete");
        }
        return ok(node);
    }


    public Result retrieveProduct() {
        User user = User.find.where().eq("authToken", request().getHeader("AUTHORIZATION")).findUnique();
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        if(user==null){
            node.put("message", "Not logged in");
            return ok(node);
        }
        List<Product> products = Product.find.where().ne("isdeleted", true).findList();
        JsonNode product = Json.toJson(products);
        return ok(product);
    }

    public Result retrieveCertainProduct(Integer x) {
        User user = User.find.where().eq("authToken", request().getHeader("AUTHORIZATION")).findUnique();
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        if(user==null){
            node.put("message", "Not logged in");
            return ok(node);
        }
        DynamicForm requestData = formFactory.form().bindFromRequest();
        Product products = Product.find.where().ne("isdeleted", true).eq("id", x).findUnique();
        node.put("message", "successfully retrieved");
        JsonNode product = Json.toJson(products);
        node.put("product", product);
        return ok(node);
    }
}
