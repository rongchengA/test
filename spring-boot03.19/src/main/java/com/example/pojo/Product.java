package com.example.pojo;

/**
 * @Auther: Admin
 * @Date: 2019/3/27 10:36
 * @Description:
 */
public class Product {

    private String pid;
    private String title;
    private String brand;
    private String pname;
    private String price;

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getPname() {
        return pname;
    }

    public void setPname(String pname) {
        this.pname = pname;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Product{" +
                "pid='" + pid + '\'' +
                ", title='" + title + '\'' +
                ", brand='" + brand + '\'' +
                ", pname='" + pname + '\'' +
                ", price='" + price + '\'' +
                '}';
    }
}
