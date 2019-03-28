package com.example.controller;

/**
 * @Auther: Admin
 * @Date: 2019/3/27 19:08
 * @Description:
 */
public class MainTest extends Thread{

    private static int tickets = 1000;

    @Override
    public void run() {
        while (true) {
                if (tickets > 0) {
                    System.out.println(this.getName() + "正在销售第" + (tickets--) + "张票！");
                } else {
                    System.out.println("票卖完了");
                    break;
                }
        }
    }
}
