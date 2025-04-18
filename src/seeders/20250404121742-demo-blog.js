'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Blogs', [
      {
        title: 'Giới thiệu Sequelize',
        author: 1, // AdminA
        description: 'Bài viết này giới thiệu ORM Sequelize trong Node.js.',
        content: 'Sequelize là một ORM mạnh mẽ cho Node.js hỗ trợ nhiều CSDL như PostgreSQL, MySQL...',
        created_date: new Date(),
        last_modified_date: new Date(),
        like_number: 5,
        imageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Hướng dẫn Migration và Seeder',
        author: 2, // AdminB
        description: 'Chi tiết cách tạo migration và seeder với sequelize-cli.',
        content: 'Bạn có thể tạo bảng bằng lệnh sequelize-cli và thêm dữ liệu mẫu với seeders...',
        created_date: new Date(),
        last_modified_date: new Date(),
        like_number: 10,
        imageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Tạo khóa ngoại trong Sequelize',
        author: 1,
        description: 'Bài viết mô tả cách liên kết bảng bằng foreign key trong Sequelize.',
        content: 'Sử dụng references để liên kết bảng Users với Blogs qua author...',
        created_date: new Date(),
        last_modified_date: new Date(),
        like_number: 3,
        imageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Đôi nét về hãng Moondrop',
        author: 2,
        description: 'Nói 1 chút về các điểm nổi bật của các sản phẩm nhà Moondrop',
        content: 'Nhà này chú trọng về vẻ bề ngoài nên các sản phẩm đều có thiết kế rất độc đáo và bắt mắt, quan trọng là khi bạn kết nối tai nghe thì giọng thông báo là tiếng gái nhật Anime nhé :)))\n Tuy thiết kế hãng độc, đẹp và cũng có nhiều con tính năng rất okela nhưng hãng lại rất flop, tuy vậy nhma giá thì không flop xíu nào :))\n\nHãng cũng colab với rất nhiều game nên bạn thích anime thì có thể tìm hiểu để sưu tẩm, hàng colab thường giá rất mắc và tính năng cũng khá bình thường nên blog chúng mình chỉ nói về những con tai nghe "ngon", xinh, iu, bổ dưỡng trong tẩm giá thui nhé, không đề cập đến những loại có mỗi cái mã đâu ạ =)) Vậy nên bạn hãy cùng đón chờ chúng mình review các siêu phẩm nhà này nhé!',
        created_date: new Date(),
        last_modified_date: new Date(),
        like_number: 23,
        imageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Block, hot hit nhà trăng rơi!!',
        author: 2,
        description: 'Dành cho những tín đồ âm nhạc cần tìm em tai nghe bán in-ear ngon trong tầm giá dưới 500k nhen',
        content: 'Moondrop Block là lựa chọn đáng cân nhắc cho những ai tìm kiếm tai nghe true wireless giá rẻ với chất lượng âm thanh tốt và nhiều tính năng hữu ích. Mặc dù sản phẩm hay bị phản ánh gặp muôn vàn kiểu lỗi :)) (có vẻ là đặc sản nhà trăng rơi rồi, nhma thật ra thì với phân khúc này việc có nhiều lỗi là chuyện bình thường thôi), nhưng với mức giá khoảng 450.000 VNĐ và nếu bạn may mắn vớ được 1 em không bị lỗi thì đây là một sự lựa chọn cực kỳ xứng đáng với giá tiền.\nThực ra mình cũng khá ưu ái nhà Moondrop chỉ đơn giản vì thiết kế tai nghe nhà này quá xuất sắc ạ, mỗi tội vỏ rất dễ trầy xước huhuhu.',
        created_date: new Date(),
        last_modified_date: new Date(),
        like_number: 39,
        imageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Moondrop Space Travel!!!',
        author: 2,
        description: 'Bét seo lơ nhà trăng rơi ở phân khúc 500-600k, chất lượng ẻm có thế số 2 nhưng thiết kế thì em là nhất!!!',
        content: 'Vỏ ngoài em này của nhà trăng rơi phải nói là quá xuất sắc! Xịn xò con bò!! Em này cũng có thiết kế bán in-ear nhen cả nhà.\n Tuy em xinh nhma vẻ đẹp này cũng chỉ là hoa trong gương, trăng dưới nước vì cái vỏ ngoài quá dễ xước ạ!! Haiz, nhma bỏ qua chuyện vẻ ngoài thì em này cũng rất ra gì và này nọ trong tẩm giá 500-600k, có hỗ trợ ANC và xuyên âm, Bluetooth 5.3, nói chung là sex xịn hơn em Moondrop Block 1 chút á (dù gì cũng mắc hơn mà :)))))\nÀ các em tai nghe nhà Moondrop cũng có app hỗ trợ Moondrop Link để chỉnh EQ giống nhà Soundcore nhé, tuy là giao diện rất là ê, dù ra mắt đã lâu nhưng app vẫn rất là dỏm nhé, đây cũng là 1 điểm trừ lớn :)).',
        created_date: new Date(),
        last_modified_date: new Date(),
        like_number: 56,
        imageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Soundcore R50i',
        author: 1,
        description: 'TWS ngon nghẻ trong khoảng 200-300k của nhà Anker!',
        content: 'Có 4 màu khá xinh iu, hộp sạc thiêt kế nhỏ gọn, không dính vân tay. Có ứng dụng chỉnh EQ, giao diện xịn đét dễ sử dụng.\nTai nghe có tích hợp Bluetooth 5.3, pin xài khoảng 10h mỗi bên, có sạc nhanh, chống nước IPX5,... mấy này dô trang bán hàng dòm nốt nha, lười kể, nói chung là xịn trong tầm giá nhưng nếu là mình thì mình thêm vài chục quất con r50i nc cho nhanh :)))\nEm này ai tai nhỏ đeo sẽ khá đau tai nhé, ẻm khá là cạnh tranh với con baseus wm02 do mức giá cũng xêm xêm mà tính năng cũng 1 9 1 10, nhma mình thì mình chọn r50i nc :)))))',
        created_date: new Date(),
        last_modified_date: new Date(),
        like_number: 93,
        imageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Tai nghe quốc dân Soundcore R50i NC !!!',
        author: 1,
        description: 'Review chiếc tai nghe ngon nhất nhì trong tầm giá dưới 400k nhà Anker!',
        content: 'Em này là bản nâng cấp của R50i nhé mn.\n Soundcore R50i NC là một lựa chọn rất đáng cân nhắc cho những ai đang tìm kiếm một chiếc tai nghe không dây giá rẻ nhưng chất lượng tốt, có chống ồn, pin trâu, âm thanh mạnh mẽ, đặc biệt còn có chống nước nữa nha! Rất phù hợp với sinh viên, người hay di chuyển hoặc cần tai nghe để làm việc từ xa.\nĐặc biệt tai nghe này còn có app Soundcore hỗ trợ viêc điều chỉnh EQ theo ý thích, tuy nhiên em này có bass rất nặng đô nên ai không thích phong cách nhạc quẩy EDM thì nên cân nhắc nhé. Hộp sạc em này còn được thiết kế để làm giá đỡ diện thoại nữa đó nha!\nLưu ý!!! Tai nghe này giá khoảng 400-500k nhưng có thể săn được với giá chỉ từ 250k bằng cách săn sale và áp max xu bên sàn Lazada nhé',
        created_date: new Date(),
        last_modified_date: new Date(),
        like_number: 104,
        imageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Bowie WM01 Baseus!!!',
        author: 1,
        description: 'Em tai nghe đời cũ nhà Baseus.',
        content: 'Hàng chính hãng nên có ưu điểm là yên tâm khi mua trên sàn Cam hoặc Lazada, bảo hành thì hên xui nhma khả năng cao là hãng sẽ liên hệ cho đổi trả khi mới mua về bị hư. Thì trang mình nói vể các em phân khúc thấp nên em nào cũng sẽ gặp nhiều lỗi vặt nhưng thường sẽ không quá nghiêm trọng, vẫn có thể sử dụng được.\nThiết kế nhỏ gọn, nhựa 99,99% nhìn phèn :)) Bluetooth 5.0, pin tẩm 4 tiếng là cao nha, có núm tai, không có ANC đâu nha (giá này đào đâu ra mà có :)))). Không chống nước luôn nhé, âm sắc nghe được, còn để thẩm nhạc thì quẹo ngay sang em khác đi :)).',
        created_date: new Date(),
        last_modified_date: new Date(),
        like_number: 82,
        imageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Bowie WM02 - Hot hit nhà Baseus!!!',
        author: 1,
        description: 'Em này là quốc dân trong tầm giá 200-300k luôn rồi.',
        content: 'Thiết kế nhỏ gọn, xinh, nhiều màu, có núm tai, có tặng kèm núm tai thay thế khi mua, Bluetooth 5.3, xài được khoảng 5h,... Không chống nước nhé :))\nCó ứng dụng hỗ trợ điều khiển cả ứng nha. Em này làm bằng nhựa thôi, tầm giá 200k nên khá oke rối, chất âm ở mức trung bình, ổn với giá. Bản nâng cấp của WM01 nên ai phân vân 2 con thì chốt em này cho nhanh, còn muốn rẻ thì chốt WM01, dù sao cũng khác nhau không nhiều á nhưng mà nghe nhạc thì em này okela hơn bản 01 nhiều.',
        created_date: new Date(),
        last_modified_date: new Date(),
        like_number: 134,
        imageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Blogs', {
      title: ['Giới thiệu Sequelize', 'Hướng dẫn Migration và Seeder', 'Tạo khóa ngoại trong Sequelize']
    }, {});
  }
};
