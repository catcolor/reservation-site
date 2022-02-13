# 預約餐廳
可以瀏覽餐廳，點擊餐廳圖片，查看詳細資訊，預約餐廳
# 功能
* 可註冊帳號
* 在首頁看到所有餐廳的資訊
* 點擊圖片看到餐廳詳細資料
* 預約餐廳
* 評論餐廳 
* 收藏餐廳
* 從類別找到想要的餐廳
* 後台新增餐廳
* 後台刪除餐廳
* 後台修改餐廳
* 後台可刪除評論和所有使用者預約紀錄
# 安裝與執行步驟
1.開啟終端機，下載 restaurant_list 資料夾到本地電腦    
   
    git clone https://github.com/catcolor/reservation-site.git

2.進入 reservation-site    

    cd reservation-site
    
3.安裝必要套件

    npm install
    
4.安裝種子資料

    npm run seed
  
5.執行

    npm run dev
    
6.輸入網址 http://localhost:3000/    
# 帳號
* 第一組帳號有 admin 權限：
 * email: root@example.com
 * password: 12345678
* 第二組帳號沒有 admin 權限：
 * email: user1@example.com
 * password: 12345678
* 第二組帳號沒有 admin 權限：
 * email: user2@example.com
 * password: 12345678
