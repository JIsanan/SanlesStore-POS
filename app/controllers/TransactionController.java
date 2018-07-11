package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import models.*;
import org.joda.time.DateTime;
import org.joda.time.Days;
import org.joda.time.Months;
import org.joda.time.Years;
import play.data.DynamicForm;
import play.data.FormFactory;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import play.api.Logger;

import javax.inject.Inject;
import java.util.Date;
import java.util.List;

public class TransactionController extends Controller {
    private final FormFactory formFactory;

    @Inject
    public TransactionController(final FormFactory formFactory) {
        this.formFactory = formFactory;
    }

    public Result createTransaction(){
        DynamicForm requestData = formFactory.form().bindFromRequest();
        User user = User.find.where().eq("authToken", request().getHeader("AUTHORIZATION")).findUnique();
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        if(user==null){
            node.put("message", "Not logged in");
            return ok(node);
        }
        UserType check = user.getPosition();
        if(check.getTypeName().equals("admin") || check.getTypeName().equals("manager") || check.getTypeName().equals("employee")){
            Product productcheck = Product.find.where().eq("id", requestData.get("product_id")).ne("isdeleted", true).findUnique();
            if(productcheck!=null && Integer.parseInt(requestData.get("quantity")) > 0 ){
                Transactions L = new Transactions();
                L.setQuantity(Integer.parseInt(requestData.get("quantity")));
                L.setProduct(productcheck);
                L.setIssuedBy(user);
                L.setIsdeleted(false);
                L.setBuyerName(requestData.get("buyer_name"));
                L.setIssuedDate(new Date());
                int totalPaid = productcheck.getPrice() * Integer.parseInt(requestData.get("quantity"));
                L.setTotalPaid(totalPaid);
                node.put("message", "transaction created successfully");
                L.save();
            }else{
                node.put("message", "product does not exist or quantity is invalid");
            }
        }else{
            node.put("message", "not authorized to add Transaction");
        }
        return ok(node);
    }


    public Result editTransaction(Integer x) {
        DynamicForm requestData = formFactory.form().bindFromRequest();
        User user = User.find.where().eq("authToken", request().getHeader("AUTHORIZATION")).findUnique();
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        if(user==null){
            node.put("message", "Not logged in");
            return ok(node);
        }
        Transactions checker = Transactions.find.where().eq("id",x).ne("isdeleted", true).findUnique();
        UserType check = user.getPosition();
        if(check.getTypeName().equals("admin") || check.getTypeName().equals("manager") || (check.getTypeName().equals("employee") && checker.getIssuedBy().getId() == user.getId())){
            Product productcheck = Product.find.where().eq("id", requestData.get("product_id")).ne("isdeleted", true).findUnique();
            if(checker.getIsdeleted() == false && productcheck!=null){
                node.put("message", "successfully edited");
                int totalPaid = productcheck.getPrice() * Integer.parseInt(requestData.get("quantity"));
                checker.setTotalPaid(totalPaid);
                checker.setQuantity(Integer.parseInt(requestData.get("quantity")));
                checker.setBuyerName(requestData.get("buyer_name"));
                checker.setUpdatedBy(user);
                checker.setProduct(productcheck);
                checker.setUpdatedDate(new Date());
                checker.update();
                node.put("message", "transaction updated successfully");
            }else{
                node.put("message", "information inputted maybe lacking or incorrect");
            }
        }else{
            node.put("message", "not authorized to edit");
        }
        return ok(node);
    }


    public Result deleteTransaction(Integer x) {
        DynamicForm requestData = formFactory.form().bindFromRequest();
        User user = User.find.where().eq("authToken", request().getHeader("AUTHORIZATION")).findUnique();
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        if(user==null){
            node.put("message", "Not logged in");
            return ok(node);
        }
        Transactions checker = Transactions.find.where().eq("id", x).ne("isdeleted", true).findUnique();
        UserType check = user.getPosition();
        if(check.getTypeName().equals("admin") || check.getTypeName().equals("manager") || (check.getTypeName().equals("employee") && checker.getIssuedBy().getId() == user.getId())){
            if(checker.getIsdeleted() == false){
                node.put("message", "successfully deleted");
                checker.setIsdeleted(true);
                checker.setUpdatedBy(user);
                checker.setUpdatedDate(new Date());
                checker.update();
                node.put("message", "transaction deleted successfully");
            }else{
                node.put("message", "transaction already deleted");
            }
        }else{
            node.put("message", "not authorized to delete");
        }
        return ok(node);
    }


    public Result retrieveTransaction(Integer pagenumber) {
        User user = User.find.where().eq("authToken", request().getHeader("AUTHORIZATION")).findUnique();
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        if(user==null){
            node.put("message", "Not logged in");
            return ok(node);
        }
        int first = pagenumber * 10;
        UserType check = user.getPosition();
        if(check.getTypeName().equals("admin") || check.getTypeName().equals("manager")){
            List<Transactions> transactions = Transactions.find.where().ne("isdeleted", true).setFirstRow(first).setMaxRows(10).findList();
            return ok(Json.toJson(transactions));
        }else if(check.getTypeName().equals("employee")){
            List<Transactions> transactions = Transactions.find.where().eq("issuedBy", user).ne("isdeleted", true).setFirstRow(first).setMaxRows(10).findList();
            return ok(Json.toJson(transactions));
        }else{
            node.put("message","not authorized");
        }
        return ok(node);
    }

    public Result retrieveDeletedTransaction(Integer pagenumber) {
        User user = User.find.where().eq("authToken", request().getHeader("AUTHORIZATION")).findUnique();
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        if(user==null){
            node.put("message", "Not logged in");
            return ok(node);
        }
        UserType check = user.getPosition();
        int first = pagenumber * 10;
        if(check.getTypeName().equals("admin")){
            List<Transactions> transactions = Transactions.find.where().eq("isdeleted", true).setFirstRow(first).setMaxRows(10).findList();
            return ok(Json.toJson(transactions));
        }else{
            node.put("message", "not authorized to access");
        }
        return ok(node);
    }

    public Result retrieveCertainTransaction(Integer x) {
        DynamicForm requestData = formFactory.form().bindFromRequest();
        User user = User.find.where().eq("authToken", request().getHeader("AUTHORIZATION")).findUnique();
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        if(user==null){
            node.put("message", "Not logged in");
            return ok(node);
        }
        UserType check = user.getPosition();
        if(check.getTypeName().equals("admin") && check.getTypeName().equals("admin")){
            Transactions products = Transactions.find.where().ne("isdeleted", true).eq("id", x).findUnique();
            if(products.getIssuedBy().getId() == user.getId()){
                JsonNode product = Json.toJson(products);
                return ok(product);
            }else{
                node.put("message", "not authorized");
            }
        }else{
            Transactions products = Transactions.find.where().ne("isdeleted", true).eq("id", x).eq("issuedBy", user).findUnique();
            if(products.getIssuedBy().getId() == user.getId()){
                JsonNode product = Json.toJson(products);
                return ok(product);
            }else{
                node.put("message", "not authorized");
            }
        }
        return ok(node);
    }

    public Result retrieveCertainTransactionBuyer(String x) {
        DynamicForm requestData = formFactory.form().bindFromRequest();
        User user = User.find.where().eq("authToken", request().getHeader("AUTHORIZATION")).findUnique();
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        if(user==null){
            node.put("message", "Not logged in");
            return ok(node);
        }
        UserType check = user.getPosition();
        List<Transactions> products;
        if(check.getTypeName().equals("admin") && check.getTypeName().equals("admin")){
            products = Transactions.find.where().ne("isdeleted", true).contains("buyerName", x).findList();
        }else{
            products = Transactions.find.where().ne("isdeleted", true).contains("buyerName", x).eq("issuedBy", user).findList();
        }
        return ok(Json.toJson(products));
    }


    public Result retrieveSales(Integer type) {
        DynamicForm requestData = formFactory.form().bindFromRequest();
        User user = User.find.where().eq("authToken", request().getHeader("AUTHORIZATION")).findUnique();
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        List<Transactions> products = Transactions.find.where().eq("isdeleted", "true").orderBy("issuedDate desc").findList();
        UserType check = user.getPosition();
        if(check.getTypeName().equals("manager") || check.getTypeName().equals("admin")){
            if(type == 0 && products.size() > 0){
                DateTime currmonth = new DateTime();
                int[] sales = new int[12];
                int monthbetween = 0;
                for(int x = 0; x < products.size(); x++){
                    Transactions newProduct = products.get(x);
                    DateTime newMonth = new DateTime(newProduct.getIssuedDate());
                    monthbetween = Months.monthsBetween(currmonth, newMonth).getMonths();
                    if(monthbetween >= 11){
                        break;
                    }
                    sales[Math.abs(monthbetween)] += newProduct.getTotalPaid();
                }
                node.put("data", Json.toJson(sales));
                return ok(node);
            }else if(type==1 && products.size() > 0){
                DateTime currDay = new DateTime();
                int[] sales = new int[30];
                int daysbetween = 0;
                for(int x = 0; x < products.size(); x++){
                    Transactions newProduct = products.get(x);
                    DateTime newDay = new DateTime(newProduct.getIssuedDate());
                    daysbetween = Days.daysBetween(newDay, currDay).getDays();
                    if(daysbetween >= 29){
                        break;
                    }
                    sales[Math.abs(daysbetween)] += newProduct.getTotalPaid();
                }
                node.put("data", Json.toJson(sales));
                return ok(node);
            }else if(type==2 && products.size() > 0){
                DateTime currDay = new DateTime();
                int sales = 0;
                int daysbetween = 0;
                for(int x = 0; x < products.size(); x++){
                    Transactions newProduct = products.get(x);
                    DateTime newDay = new DateTime(newProduct.getIssuedDate());
                    daysbetween = Days.daysBetween(newDay, currDay).getDays();
                    if(daysbetween > 0){
                        break;
                    }
                    sales += newProduct.getTotalPaid();
                }
                node.put("data", Json.toJson(sales));
                return ok(node);
            }
        }else{
            node.put("message", "not authorized");
        }

        node.put("message", "not enough data");
        return ok(node);
    }
}