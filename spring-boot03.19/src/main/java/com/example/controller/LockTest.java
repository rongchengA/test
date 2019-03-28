package com.example.controller;

/**
 * @Auther: Admin
 * @Date: 2019/3/27 18:52
 * @Description:
 */
public class LockTest extends Thread {

    private static int tickets = 1000;

    @Override
    public void run() {
        while (true) {
            synchronized ("lock") {

                if (tickets > 0) {
                    System.out.println(this.getName() + "正在销售第" + (tickets--) + "张票！");
                } else {
                    System.out.println("票卖完了");
                    break;
                }
            }
        }
    }


    public static void main(String[] args) {
        for (int i = 0; i < 4; i++) {
            new LockTest().start();
        }
    }
}



