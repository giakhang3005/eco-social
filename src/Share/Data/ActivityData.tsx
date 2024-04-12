const time = { margin: '15px 0 15px 0', fontWeight: 600 }
const content = {}
const important = { color: 'var(--error-color)' }

export const ActivityData = [
    {
        id: 'challenge',
        title: 'Thử thách 5 ngày sống xanh',
        content: (
            <>
                <div style={Object.assign(time)}>Thời gian diễn ra: 31/05/2024 - 05/06/2024</div>
                <div style={Object.assign(content)}>
                    Hoạt động kéo dài trong 5 ngày trước ngày diễn ra sự kiện. Mỗi ngày, người tham gia sẽ phải <b style={important}>thực hiện một thử thách</b> mà BTC đề ra bằng cách <b style={important}>chụp lại hình ảnh tham gia thử thách và đăng tải lên trang cá nhân của nền tảng</b>.
                    <br></br><br></br>
                    Người tham gia sau khi thực hiện thử thách với số ngày nhất định sẽ được <b style={important}>nhận phần thưởng tương đương tại Quầy nhận thưởng trong ngày diễn ra sự kiện</b>.
                </div>
            </>
        )
    },
    {
        id: 'quyengop',
        title: 'Cuộc đua quyên góp',
        content: (
            <>
                <div style={Object.assign(time)}>Thời gian diễn ra: 21/05/2024 - 04/06/2024</div>
                <div style={Object.assign(content)}>
                    Người tham gia sẽ mang các vật dụng có thể tái chế được như: Chai nước, bìa carton, lon thiếc,... và đem đến booth thu gom để quy đổi thành điểm. Cách quy đổi điểm như sau:
                    <br />
                    <ul>
                        <li>1 chai 250ml = 1 điểm</li>
                        <li>1 chai 500ml = 2 điểm</li>
                        <li>1 chai trên 1l = 3 điểm</li>
                        <li>Bìa carton thùng nước = 2 điểm</li>
                        <li>1 lon nước: 1 điểm</li>
                    </ul>
                    <b style={important}>Số điểm sẽ được tích lũy vào tài khoản</b> của người tham dự và người tham dự có thể dùng điểm để <b style={important}>đổi các phần thưởng</b> tương đương vào ngày diễn ra sự kiện (05/06/2024).
                </div>
            </>
        )
    },
    {
        id: 'gianhangkygui',
        title: 'Gian hàng ký gửi',
        content: (
            <>
                <div style={Object.assign(time)}>Thời gian diễn ra: 21/05/2024 - 01/06/2024</div>
                <div style={Object.assign(content)}>
                    BTC sẽ mở quầy ký gửi để nhận đồ và tính phí ký gửi. Toàn bộ quần áo ký gửi sẽ được trưng bày và bán tại ngày diễn ra sự kiện.
                    <br /><br />
                    Quần áo sau khi bán, BTC sẽ giữ phần tiền ký gửi để hỗ trợ cho các hoạt động khác của sự kiện và <b style={important}>hoàn trả số tiền còn lại cho người ký gửi</b>. Đối với các sản phẩm không bán được, BTC sẽ hoàn trả lại nguyên vẹn sản phẩm.
                </div>
            </>
        )
    },
    {
        id: 'quiz',
        title: 'So tài kiến thức',
        content: (
            <>
                <div style={Object.assign(time)}>Thời gian diễn ra: 21/05/2024 - 03/06/2024</div>
                <div style={Object.assign(content)}>
                    Người tham gia sẽ trao đổi và mua bán quần áo secondhand (quần áo cũ còn giá trị sử dụng)
                    <br /><br />
                    Cách tham gia: Mọi người sẽ mang những món secondhand (còn giá trị sử dụng) của mình có thể là quần áo, đồ điện tử,... Đem đến ký gửi ở gian hàng, gian hàng sẽ định giá và bán lại cho những bạn khác với <b style={important}>mức hoa hồng là 3/7 ( người bán hàng 7, gian hàng 3)</b>. Trường hợp gian hàng không bán được sẽ liên hệ để trả hàng, nếu không liên hệ được sẽ livestream trên group Gia Đình Cóc Sài Gòn.
                </div>
            </>
        )
    },
    {
        id: 'fashionshow',
        title: 'Fashion Show',
        content: (
            <>
                <div style={Object.assign(time)}>Thời gian diễn ra: 05/06/2024</div>
                <div style={Object.assign(content)}>
                    Là hoạt động mà chúng ta không chỉ có thể thưởng thức các tiết mục trình diễn thời trang trong một không gian nghệ thuật đặc sắc, mà tại đây người tham gia còn được lắng nghe những chia sẻ, thông điệp "xanh" từ diễn giả của sự kiện.
                    <br /> <br />
                    Song song đó là màn trình diễn bài hát chủ đề của sự kiện và các tiết mục giải trí khác. Mang tới một không gian đầy nghệ thuật và nhân văn.
                </div>
            </>
        )
    },
    {
        id: 'hayday',
        title: 'Hayday - Nông trại xanh',
        content: (
            <>
                <div style={Object.assign(time)}>Thời gian diễn ra: 05/06/2024</div>
                <div style={Object.assign(content)}>
                    Là hoạt động bán đồ ăn và thức uống trong ngày diễn ra sự kiện. Các mặt hàng đều có nguồn gốc cây nhà lá vườn, các loại trái cây thân thiện với môi trường. Bao gồm: <b style={Object.assign(important)}>Xoài lắc và Trà chanh</b>.
                    <br /><br />
                    Khi đến với gian hàng, <b style={Object.assign(important)}>nếu khách mang theo vật phẩm đựng đồ ăn và thức uống cá nhân sẽ có thể mua hàng với giá rẻ hơn.</b> Ngược lại, giá trị hàng hoá sẽ tăng nếu khách lấy và sử dụng vật đựng của Nông trại.
                </div>
            </>
        )
    },
    {
        id: 'practicalworkshop',
        title: 'Practical Workshop',
        content: (
            <>
                <div style={Object.assign(time)}>Thời gian diễn ra: 05/06/2024</div>
                <div style={Object.assign(content)}>
                    <b style={Object.assign(important)}>Workshop làm nến thơm:</b>
                    <br />
                    Người chơi sẽ được tự tay trải nghiệm quá trình tạo nến thơm và có thể mang về thành phẩm sau khi làm. Trong quá trình thực hiện sẽ có nghệ nhân hướng dẫn các công đoạn làm.
                    <br /><br />
                    <b style={Object.assign(important)}>Workshop tô màu:</b>
                    <br />
                    Người chơi sẽ được tự tay trang trí và tô màu theo sở thích lên các vật phẩm của BTC hoặc chậu cây từ Kit trồng cây nhận được khi hoàn thành Minigame và mang thành phẩm trở về.
                </div>
            </>
        )
    },
    {
        id: 'minigame',
        title: 'Minigame',
        content: (
            <>
                <div style={Object.assign(time)}>Thời gian diễn ra: 05/06/2024</div>
                <div style={Object.assign(content)}>
                    Gồm 3 trò chơi tương tác, được BTC thực hiện bằng các nguyên liệu tái chế từ rác thải (chai nhựa, lon nước, bìa carton,..) và sử dụng các chất liệu thân thiện với môi trường. <b style={Object.assign(important)}>Người chơi sau khi hoàn thành tất cả 3 trò chơi sẽ được nhận bộ Kit trồng cây bao gồm chậu, đất và hạt giống</b>.
                    <br /><br />
                    <b style={Object.assign(important)}>Câu rác</b>
                    <br />
                    BTC sẽ chuẩn bị 1 chiếc thùng lớn có chứa các vật cản và các mô hình rác đã được BTC chuẩn bị và đính nam châm. Người tham gia sẽ được phát 1 cây cần câu có sợi dây câu đính nam châm, trong 2 phút phải câu các loại rác theo yêu cầu để hoàn thành trò chơi.
                    <br /><br />
                    <b style={Object.assign(important)}>Bowling</b>
                    <br />
                    BTC sẽ chuẩn bị 10 quân Ki được làm từ chai nhựa và 1 quả bóng. Người chơi có nhiệm vụ làm đổ số quân Ki để hoàn thành trò chơi. Mỗi người chơi có 1 lượt ném, người chơi sẽ được tính là hoàn thành trò chơi khi làm đổ 7/10 quân Ki.
                    <br /><br />
                    <b style={Object.assign(important)}>Bóng rổ</b>
                    <br />
                    BTC sẽ chuẩn bị 3 rổ lưới, 3 thùng phân loại rác khác nhau, và các mô hình rác cần được phân loại. Người chơi sẽ phải phân loại rác và ném vào các rổ, các thùng rác chính xác.
                </div>
            </>
        )
    },
]