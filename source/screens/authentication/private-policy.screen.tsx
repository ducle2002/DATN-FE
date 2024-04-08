import {Dimensions, StatusBar, View} from 'react-native';
import React from 'react';
import RenderHTML from 'react-native-render-html';
import {ScrollView} from 'react-native-gesture-handler';
const {width} = Dimensions.get('screen');
const PrivatePolicyScreen = () => {
  const policy = `<p style="text-align:center;"><strong>I. ĐIỀU KHOẢN SỬ DỤNG</strong></p>
<p>YooLife có thể điều chỉnh nội dung thông báo này bất cứ lúc nào bằng cách cập nhật lên Ứng dụng. YooLife mong bạn vui lòng dành thời gian đọc, tìm hiểu và thường xuyên truy cập Ứng dụng để theo dõi những điều khoản về thỏa thuận pháp lý giữa bạn và YooLife.</p>
<p><strong>1. Quyền và trách nhiệm của YooLife</strong></p>
<p>YooLife có quyền thay đổi và/hoặc chấm dứt các nội dung, tính năng của một phần hay toàn bộ Ứng dụng mà không cần thông báo trước với người dùng.</p>
<p>YooLife có quyền thực hiện các biện pháp an ninh để bảo vệ và ngăn chặn các truy cập trái phép hoặc sửa đổi trái phép, tiết lộ hoặc phá hủy thông tin.</p>
<p>Khi người dùng truy cập Ứng dụng, thông tin sẽ được truyền qua một phương tiện/ thiết bị nằm ngoài sự kiểm soát của YooLife. Vì vậy, YooLife không chịu trách nhiệm cho hoặc liên quan đến bất kỳ sự chậm trễ, thất bại, bị gián đoạn của bất kỳ dữ liệu hoặc các thông tin khác được truyền trong kết nối với việc sử dụng của Ứng dụng.</p>
<p>Thông tin cá nhân như Họ tên, Email, Số điện thoại, Doanh nghiệp, Nội dung của người dùng Ứng dụng (do người dùng tự nguyện cung cấp) có thể được sử dụng nội bộ cho mục đích nâng cấp các sản phẩm, dịch vụ của YooLife. YooLife cam kết không chủ động tiết lộ bất kỳ thông tin nào của người sử dụng cho bên thứ ba, ngoại trừ trường hợp có yêu cầu bằng văn bản của các cơ quan pháp luật.</p>
<p><strong>2. Quyền và trách nhiệm của người dùng</strong></p>
<p>YooLife cho phép người dùng xem, chiết xuất thông tin trên Ứng dụng (in, tải, chuyển tiếp…) hoặc chia sẻ cho người khác nhưng chỉ cho mục đích sử dụng cá nhân và phi thương mại với điều kiện phải trích dẫn thông báo bản quyền.</p>
<p>Người dùng không can thiệp, gây ảnh hưởng đến việc sử dụng Ứng dụng của những người dùng khác; Không can thiệp vào hoạt động và quản lý Ứng dụng của YooLife.</p>
<p><strong>3. Điều khoản chung</strong></p>
<p>ĐIều khoản sử dụng được điều chỉnh bởi pháp luật Việt Nam.</p>
<p>Các điều khoản sử dụng bị vô hiệu theo quyết định của tòa án có thẩm quyền sẽ không ảnh hưởng đến tính hiệu lực của các điều khoản còn lại.</p>
<p>YooLife luôn hoan nghênh những ý kiến/góp ý của bạn về nội dung/ chất lượng của Ứng dụng. Nếu có một phần nào đó của Ứng dụng này mà bạn cho rằng đã có dấu hiệu vi phạm bản quyền của bên thứ ba, vui lòng gửi liên hệ với YooLife:</p>
<p><span style="color:#d32f2f;">Gửi thư về YooLife theo địa chỉ: info@yootek.vn</span></p>
<p><span style="color:#d32f2f;">Hotline:&nbsp; 077 924 0938</span></p>
<p>&nbsp;</p>
<p style="text-align:center;"><strong>II. CHÍNH SÁCH BẢO MẬT</strong></p>
<p>Chính sách bảo mật dữ liệu cá nhân (“Chính sách”) mô tả các hoạt động liên quan đến việc xử lý dữ liệu cá nhân của Khách hàng khi truy cập vào trang web hoặc ứng dụng của Công ty Cổ phần Yootek Holding (“YooLife”).</p>
<p>&nbsp;</p>
<p><strong>Điều 1. Đối tượng và phạm vi áp dụng</strong></p>
<p>Chính sách này điều chỉnh cách thức mà YooLife thu thập và xử lý, lưu trữ dữ liệu cá nhân của Khách hàng sử dụng hoặc tương tác với các sản phẩm, trang web, ứng dụng hoặc dịch vụ của YooLife.</p>
<p>Để tránh nhầm lẫn, Chính sách bảo mật dữ liệu này chỉ áp dụng cho Khách hàng là cá nhân. YooLife khuyến khích Khách hàng đọc kỹ Chính sách này và thường xuyên kiểm tra trang tin điện tử để cập nhật bất kỳ thay đổi nào mà YooLife có thể thực hiện theo các điều khoản của Chính sách.</p>
<p>&nbsp;</p>
<p><strong>Điều 2. Giải thích từ ngữ</strong></p>
<p>2.1. “Khách hàng” là cá nhân tiếp cận, tìm hiểu, đăng ký, sử dụng hoặc có liên quan trong quy trình hoạt động, cung cấp các sản phẩm, dịch vụ của YooLife.</p>
<p>2.2. “Dữ liệu cá nhân” hay “DLCN” là thông tin dưới dạng ký hiệu, chữ viết, chữ số, hình ảnh, âm thanh hoặc dạng tương tự trên môi trường điện tử gắn liền với một con người cụ thể hoặc giúp xác định một con người cụ thể.</p>
<p>Dữ liệu cá nhân bao gồm dữ liệu cá nhân cơ bản và dữ liệu cá nhân nhạy cảm.</p>
<p>2.3. Dữ liệu cá nhân cơ bản bao gồm:</p>
<ul>
    <li>Họ, chữ đệm và tên khai sinh, tên gọi khác (nếu có);</li>
    <li>Ngày, tháng, năm sinh; ngày, tháng, năm chết hoặc mất tích;</li>
    <li>Giới tính;</li>
    <li>Nơi sinh, nơi đăng ký khai sinh, nơi thường trú, nơi tạm trú, nơi ở hiện tại, quê quán, địa chỉ liên hệ;</li>
    <li>Quốc tịch;</li>
    <li>Hình ảnh của cá nhân;</li>
    <li>Số điện thoại, số chứng minh nhân dân, số định danh cá nhân, số hộ chiếu, số giấy phép lái xe, số biển số xe, số mã số thuế cá nhân, số bảo hiểm xã hội, số thẻ bảo hiểm y tế;</li>
    <li>Tình trạng hôn nhân;</li>
    <li>Thông tin về mối quan hệ gia đình (cha mẹ, con cái);</li>
    <li>Thông tin về tài khoản số của cá nhân; dữ liệu cá nhân phản ánh hoạt động, lịch sử hoạt động trên không gian mạng;</li>
    <li>Các thông tin khác gắn liền với một con người cụ thể hoặc giúp xác định một con người cụ thể không thuộc Dữ liệu cá nhân nhạy cảm.</li>
    <li>Các dữ liệu khác theo quy định pháp luật hiện hành</li>
</ul>
<p>2.4. Dữ liệu cá nhân nhạy cảm dữ liệu cá nhân gắn liền với quyền riêng tư của cá nhân mà khi bị xâm phạm sẽ gây ảnh hưởng trực tiếp tới quyền và lợi ích hợp pháp của cá nhân gồm:</p>
<ul>
    <li>Quan điểm chính trị, quan điểm tôn giáo;</li>
    <li>Tình trạng sức khỏe và đời tư được ghi trong hồ sơ bệnh án, không bao gồm thông tin về nhóm máu;</li>
    <li>Thông tin liên quan đến nguồn gốc chủng tộc, nguồn gốc dân tộc;</li>
    <li>Thông tin về đặc điểm di truyền được thừa hưởng hoặc có được của cá nhân;</li>
    <li>Thông tin về thuộc tính vật lý, đặc điểm sinh học riêng của cá nhân;</li>
    <li>Thông tin về đời sống tình dục, xu hướng tình dục của cá nhân;</li>
    <li>Dữ liệu về tội phạm, hành vi phạm tội được thu thập, lưu trữ bởi các cơ quan thực thi pháp luật;</li>
    <li>Thông tin Khách hàng của tổ chức tín dụng, chi nhánh ngân hàng nước ngoài, tổ chức cung ứng dịch vụ trung gian thanh toán, các tổ chức được phép khác, gồm: thông tin định danh Khách hàng theo quy định của pháp luật, thông tin về tài khoản, thông tin về tiền gửi, thông tin về tài sản gửi, thông tin về giao dịch, thông tin về tổ chức, cá nhân là bên bảo đảm tại tổ chức tín dụng, chi nhánh ngân hàng, tổ chức cung ứng dịch vụ trung gian thanh toán;</li>
    <li>Dữ liệu về vị trí của cá nhân được xác định qua dịch vụ định vị;</li>
    <li>Dữ liệu cá nhân khác được pháp luật quy định là đặc thù và cần có biện pháp bảo mật cần thiết.</li>
</ul>
<p>2.5. Bảo vệ dữ liệu cá nhân: là hoạt động phòng ngừa, phát hiện, ngăn chặn, xử lý hành vi vi phạm liên quan đến dữ liệu cá nhân theo quy định của pháp luật.</p>
<p>2.6. Xử lý dữ liệu cá nhân: là một hoặc nhiều hoạt động tác động tới dữ liệu cá nhân, như: thu thập, ghi, phân tích, xác nhận, lưu trữ, chỉnh sửa, công khai, kết hợp, truy cập, truy xuất, thu hồi, mã hóa, giải mã, sao chép, chia sẻ, truyền đưa, cung cấp, chuyển giao, xóa, hủy dữ liệu cá nhân hoặc các hành động khác có liên quan.</p>
<p>2.7. Bên thứ ba: là tổ chức, cá nhân khác ngoài YooLife và Khách hàng đã được giải thích theo Chính sách này.</p>
<p>Để làm rõ hơn, các từ ngữ nào chưa được giải thích tại Điều này sẽ được hiểu và áp dụng theo pháp luật Việt Nam.</p>
<p>&nbsp;</p>
<p><strong>Điều 3. Mục đích xử lý dữ liệu cá nhân</strong></p>
<p>3.1. YooLife có thể xử lý dữ liệu cá nhân của Khách hàng cho một hoặc nhiều mục đích sau đây:</p>
<ul>
    <li>Cung cấp sản phẩm hoặc dịch vụ của YooLife;</li>
    <li>Điều chỉnh, cập nhật, bảo mật và cải tiến các sản phẩm, dịch vụ, ứng dụng mà YooLife đang cung cấp cho Khách hàng;</li>
    <li>Xác minh danh tính và đảm bảo tính bảo mật thông tin cá nhân của Khách hàng;</li>
    <li>Đáp ứng các yêu cầu dịch vụ và nhu cầu hỗ trợ của Khách hàng;</li>
    <li>Thông báo cho Khách hàng về những thay đổi đối với các chính sách, khuyến mại của các sản phẩm, dịch vụ mà YooLife đang cung cấp;</li>
    <li>Đo lường, phân tích dữ liệu nội bộ và các xử lý khác để cải thiện, nâng cao chất lượng dịch vụ/sản phẩm của YooLife hoặc thực hiện các hoạt động truyền thông tiếp thị;</li>
    <li>Ngặn chặn và phòng chống gian lận, đánh cắp danh tính và các hoạt động bất hợp pháp khác;</li>
    <li>Để có cơ sở thiết lập, thực thi các quyền hợp pháp hoặc bảo vệ các khiếu nại pháp lý của YooLife, Khách hàng hoặc bất kỳ cá nhân nào. Các mục đích này có thể bao gồm việc trao đổi dữ liệu với các YooLife và tổ chức khác để ngăn chặn và phát hiện gian lận, giảm rủi ro về tín dụng;</li>
    <li>Tuân thủ pháp luật hiện hành, các tiêu chuẩn ngành có liên quan và các chính sách hiện hành khác của YooLife;</li>
    <li>Bất kỳ mục đích nào khác dành riêng cho hoạt động vận hành của YooLife; và</li>
</ul>
<p>3.2. YooLife sẽ yêu cầu sự cho phép của Khách hàng trước khi sử dụng dữ liệu cá nhân của Khách hàng theo bất kỳ mục đích nào khác ngoài các mục đích đã được nêu tại Điều 3.1 trên, vào thời điểm thu thập dữ liệu cá nhân của Khách hàng hoặc trước khi bắt đầu xử lý liên quan hoặc theo yêu cầu khác hoặc được pháp luật hiện hành cho phép.</p>
<p>&nbsp;</p>
<p><strong>Điều 4. Bảo mật Dữ liệu cá nhân Khách hàng</strong></p>
<p>4.1. Dữ liệu cá nhân của Khách hàng được cam kết bảo mật tối đa theo quy định của YooLife và quy định của pháp luật. Việc xử lý Dữ liệu cá nhân của mỗi Khách hàng chỉ được thực hiện khi có sự đồng ý của Khách hàng, trừ trường hợp pháp luật có quy định khác.</p>
<p>4.2. YooLife không sử dụng, chuyển giao, cung cấp hay chia sẻ cho bên thứ ba nào về Dữ liệu cá nhân của Khách hàng khi không có sự đồng ý của Khách hàng, trừ trường hợp pháp luật có quy định khác.</p>
<p>4.3. YooLife sẽ tuân thủ các nguyên tắc bảo mật dữ liệu cá nhân khác theo quy định pháp luật hiện hành.</p>
<p>4.4. YooLife sử dụng nhiều công nghệ bảo mật thông tin khác nhau nhằm bảo vệ Dữ liệu cá nhân của Khách hàng không bị truy lục, sử dụng hoặc chia sẻ ngoài ý muốn. Tuy nhiên, không một dữ liệu nào có thể được bảo mật 100%. Do vậy, YooLife cam kết sẽ bảo mật một cách tối đa Dữ liệu cá nhân của Khách hàng. Một số hậu quả, thiệt hại không mong muốn có thể xảy ra bao gồm nhưng không giới hạn:</p>
<ul>
    <li>Lỗi phần cứng, phần mềm trong quá trình xử lý dữ liệu làm mất dữ liệu của Khách hàng;</li>
    <li>Lỗ hổng bảo mật nằm ngoài khả năng kiểm soát của YooLife, hệ thống có liên quan bị hacker tấn công gây lộ dữ liệu;</li>
    <li>Khách hàng tự làm lộ dữ liệu cá nhân do: bất cẩn hoặc bị lừa đảo; truy cập các Ứng dụng/tải các ứng dụng có chứa phần mềm độc hại, vv...</li>
</ul>
<p>4.5. YooLife khuyến cáo Khách hàng bảo mật các thông tin liên quan đến mật khẩu đăng nhập vào tài khoản của Khách hàng, mã OTP và không chia sẻ mật khẩu đăng nhập, mã OTP này với bất kỳ người nào khác.</p>
<p>4.6. Khách hàng nên bảo quản thiết bị điện tử trong quá trình sử dụng; Khách hàng nên khóa, đăng xuất, hoặc thoát khỏi tài khoản trên Ứng dụng hoặc ứng dụng của YooLife khi không sử dụng.</p>
<p>&nbsp;</p>
<p><strong>Điều 5. Các loại dữ liệu cá nhân mà YooLife thu thập, xử lý</strong></p>
<p>Để YooLife có thể cung cấp các sản phẩm, dịch vụ cho Khách hàng và/hoặc xử lý các yêu cầu của Khách hàng, YooLife có thể cần phải và/hoặc được yêu cầu phải thu thập dữ liệu cá nhân, bao gồm:</p>
<ul>
    <li>Dữ liệu cá nhân cơ bản của Khách hàng và các cá nhân có liên quan của Khách hàng; và,</li>
    <li>Dữ liệu cá nhân nhạy cảm của Khách hàng và các cá nhân có liên quan của Khách hàng;</li>
    <li>Dữ liệu liên quan đến các trang tin điện tử hoặc ứng dụng: dữ liệu kỹ thuật (như đã nêu ở trên, bao gồm loại thiết bị, hệ điều hành, loại trình duyệt, cài đặt trình duyệt, địa chỉ IP, cài đặt ngôn ngữ, ngày và giờ kết nối với trang tin điện tử, thống kê sử dụng ứng dụng, cài đặt ứng dụng, ngày và giờ kết nối với ứng dụng, dữ liệu vị trí và thông tin liên lạc kỹ thuật khác); chi tiết đăng nhập bảo mật; dữ liệu sử dụng, ...</li>
    <li>Dữ liệu tiếp thị: các mối quan tâm đối với quảng cáo; dữ liệu cookie; dữ liệu clickstream; lịch sử duyệt web; phản ứng với tiếp thị trực tiếp; và lựa chọn không tham gia tiếp thị trực tiếp.</li>
</ul>
<p>&nbsp;</p>
<p><strong>Điều 6. Cách thức thu thập dữ liệu cá nhân</strong></p>
<p>YooLife thực hiện thu thập dữ liệu cá nhân từ Khách hàng theo các phương thức sau:</p>
<p>6.1. Trực tiếp từ Khách hàng bằng các phương tiện khác nhau:</p>
<ul>
    <li>Khi Khách hàng gửi yêu cầu đăng ký hoặc bất kỳ biểu mẫu nào khác liên quan tới các sản phẩm và dịch vụ của YooLife;</li>
    <li>Khi Khách hàng tương tác với nhân viên dịch vụ Khách hàng của YooLife, ví dụ như thông qua các cuộc gọi điện thoại, thư từ, gặp mặt trực tiếp, gửi thư điện tử hoặc tương tác trên mạng xã hội;</li>
    <li>Khi Khách hàng sử dụng các trang web và ứng dụng của YooLife;</li>
    <li>Khi Khách hàng được liên hệ và phản hồi lại các đại diện tiếp thị và các nhân viên dịch vụ Khách hàng của YooLife;</li>
    <li>Khi Khách hàng gửi thông tin cá nhân của mình cho YooLife vì bất kỳ lý do nào khác, bao gồm cả khi Khách hàng đăng ký sử dụng thử miễn phí bất kỳ sản phẩm và dịch vụ nào hoặc khi Khách hàng thể hiện quan tâm đến bất kỳ sản phẩm và dịch vụ nào của YooLife.</li>
</ul>
<p>6.2. Từ các bên thứ ba khác:</p>
<ul>
    <li>Nếu Khách hàng tương tác với nội dung hoặc quảng cáo của bên thứ ba trên trang tin điện tử hoặc trong ứng dụng, YooLife có thể nhận được thông tin cá nhân của Khách hàng từ bên thứ ba có liên quan, theo chính sách bảo mật hiện hành hợp pháp của bên thứ ba đó.</li>
    <li>Nếu Khách hàng chọn thanh toán điện tử trực tiếp tới YooLife hoặc thông qua trang tin điện tử hoặc ứng dụng, YooLife có thể nhận được dữ liệu cá nhân của Khách hàng từ các bên thứ ba, chẳng hạn như nhà cung cấp dịch vụ thanh toán, cho mục đích thanh toán đó.</li>
    <li>Để tuân thủ các nghĩa vụ của mình theo luật hiện hành, YooLife có thể tiếp nhận dữ liệu cá nhân về Khách hàng từ các cơ quan pháp luật và cơ quan công quyền theo quy định pháp luật.</li>
    <li>YooLife có thể tiếp nhận được dữ liệu cá nhân về Khách hàng từ các nguồn công khai (như danh bạ điện thoại, thông tin quảng cáo/tờ rơi, các thông tin được công khai trên các trang tin điện tử, v.v.).</li>
</ul>
<p>Bất cứ khi nào thu thập dữ liệu cá nhân như vậy, YooLife sẽ đảm bảo việc nhận dữ liệu từ các bên thứ ba có liên quan theo những cách hợp pháp, đồng thời yêu cầu các bên thứ ba đó chịu trách nhiệm tuân thủ quy định của pháp luật về bảo vệ dữ liệu cá nhân.</p>
<p>&nbsp;</p>
<p><strong>Điều 7. Tổ Chức Được Xử Lý Dữ Liệu Cá Nhân</strong></p>
<p>7.1. YooLife.</p>
<p>7.2. YooLife sẽ thực hiện việc chia sẻ hoặc cùng xử lý dữ liệu cá nhân với các tổ chức, cá nhân sau:</p>
<ul>
    <li><span style="color:#d32f2f;">Các nhà thầu, đại lý, đối tác, các nhà cung cấp dịch vụ vận hành của YooLife.</span></li>
    <li><span style="color:#d32f2f;">Các chi nhánh, đơn vị kinh doanh và các cán bộ nhân viên làm việc tại các chi nhánh, đơn vị kinh doanh, đại lý của YooLife.</span></li>
    <li>Các cố vấn chuyên nghiệp của YooLife như kiểm toán, luật sư,… theo quy định của pháp luật.</li>
    <li>Tòa án, các cơ quan nhà nước có thẩm quyền phù hợp với quy định của pháp luật và/hoặc khi được yêu cầu và pháp luật cho phép.</li>
</ul>
<p>7.3. YooLife cam kết việc chia sẻ hoặc cùng xử lý dữ liệu cá nhân chỉ thực hiện trong trường hợp cần thiết để thực hiện các Mục Đích Xử Lý được nêu tại Chính sách này hoặc theo quy định của pháp luật. Các tổ chức, cá nhân nhận được dữ liệu cá nhân của Khách hàng sẽ phải tuân thủ theo nội dung quy định tại Chính sách này và quy định của pháp luật về bảo vệ dữ liệu cá nhân liên quan.</p>
<p>Mặc dù YooLife sẽ thực hiện mọi nỗ lực để đảm bảo rằng các thông tin Khách hàng được ẩn danh/mã hóa, nhưng không thể loại trừ hoàn toàn rủi ro các dữ liệu này có thể bị tiết lộ trong những trường hợp bất khả kháng.</p>
<p>7.4. Trong trường hợp có sự tham gia của các tổ chức xử lý dữ liệu cá nhân khác được nêu tại Điều này, Khách hàng đồng ý YooLife sẽ thông báo cho Khách hàng trước khi YooLife thực hiện.</p>
<p>&nbsp;</p>
<p><strong>Điều 8. Xử lý dữ liệu cá nhân trong một số trường hợp đặc biệt</strong></p>
<p>YooLife đảm bảo thực hiện xử lý dữ liệu cá nhân của Khách hàng đáp ứng đầy đủ các yêu cầu của Pháp luật trong các trường hợp đặc biệt nêu sau:</p>
<p>8.1. YooLife luôn tôn trọng và bảo vệ dữ liệu cá nhân của trẻ em. Ngoài các biện pháp bảo vệ dữ liệu cá nhân được quy định theo pháp luật, trước khi xử lý dữ liệu cá nhân của trẻ em, YooLife sẽ thực hiện xác minh tuổi của trẻ em và yêu cầu sự đồng ý của (i) trẻ em và/hoặc (ii) cha, mẹ hoặc người giám hộ của trẻ em theo quy định của pháp luật.</p>
<p>8.2. Bên cạnh tuân thủ theo các quy định pháp luật có liên quan khác, đối với việc xử lý dữ liệu cá nhân liên quan đến dữ liệu cá nhân của người bị tuyên bố mất tích/ người đã chết, YooLife sẽ phải được sự đồng ý của một trong số những người có liên quan theo quy định của pháp luật hiện hành.</p>
<p>&nbsp;</p>
<p><strong>Điều 9. Quyền và nghĩa vụ của Khách hàng liên quan đến dữ liệu cá nhân cung cấp cho YooLife</strong></p>
<p>9.1. Khách hàng có quyền được biết về hoạt động xử lý dữ liệu cá nhân của mình, trừ trường hợp pháp luật có quy định khác.</p>
<ul>
    <li>Khách hàng được đồng ý hoặc không đồng ý cho phép xử lý dữ liệu cá nhân của mình, trừ trường hợp luật có quy định khác.</li>
    <li>Khách hàng được quyền truy cập để xem, chỉnh sửa hoặc yêu cầu chỉnh sửa Dữ liệu cá nhân của mình bằng văn bản gửi đến YooLife, trừ trường hợp luật có quy định khác.</li>
    <li>Khách hàng có quyền rút lại sự đồng ý của mình bằng văn bản gửi đến YooLife, trừ trường hợp pháp luật có quy định khác.</li>
</ul>
<p>Việc rút lại sự đồng ý không ảnh hưởng đến tính hợp pháp của việc xử lý dữ liệu đã được Khách hàng đồng ý với YooLife trước khi rút lại sự đồng ý.</p>
<ul>
    <li>Khách hàng được quyền xóa hoặc yêu cầu xóa dữ liệu cá nhân của mình bằng văn bản gửi đến YooLife, trừ trường hợp luật có quy định khác.</li>
    <li>Khách hàng được quyền yêu cầu hạn chế xử lý Dữ liệu cá nhân của mình bằng văn bản gửi đến YooLife, trừ trường hợp luật có quy định khác.</li>
</ul>
<p>Việc hạn chế xử lý dữ liệu sẽ được YooLife thực hiện trong 72 giờ sau khi có yêu cầu của Khách hàng, với toàn bộ Dữ liệu cá nhân mà Khách hàng yêu cầu hạn chế, trừ trường hợp pháp luật có quy định khác.</p>
<ul>
    <li>Khách hàng được quyền yêu cầu YooLife cung cấp cho bản thân Dữ liệu cá nhân của mình bằng văn bản gửi đến YooLife, trừ trường hợp luật có quy định khác.</li>
    <li>Khách hàng được quyền phản đối YooLife, Tổ Chức Được Xử Lý Dữ Liệu Cá Nhân quy định tại Chính sách này xử lý dữ liệu cá nhân của mình bằng văn bản gửi đến YooLife nhằm ngăn chặn hoặc hạn chế việc tiết lộ DLCN hoặc sử dụng DLCN cho mục đích quảng cáo, tiếp thị, trừ trường hợp pháp luật có quy định khác.</li>
</ul>
<p>YooLife sẽ thực hiện yêu cầu của Khách hàng trong 72 giờ sau khi nhận được yêu cầu, trừ trường hợp luật có quy định khác.</p>
<ul>
    <li>Khách hàng có quyền khiếu nại, tố cáo hoặc khởi kiện theo quy định của pháp luật.</li>
    <li>Khách hàng có quyền yêu cầu bồi thường đối với thiệt hại thực tế theo quy định của pháp luật nếu YooLife có hành vi vi phạm quy định về bảo vệ Dữ liệu cá nhân của mình, trừ trường hợp các bên có thỏa thuận khác hoặc luật có quy định khác.</li>
    <li>Khách hàng có quyền tự bảo vệ theo quy định của Bộ luật Dân sự, luật khác có liên quan, hoặc yêu cầu cơ quan, tổ chức có thẩm quyền thực hiện các phương thức bảo vệ quyền dân sự theo quy định tại Điều 11 Bộ luật Dân sự.</li>
    <li>Các quyền khác theo quy định của pháp luật hiện hành.</li>
</ul>
<p>9.2. Nghĩa vụ của Khách hàng</p>
<ul>
    <li>Tuân thủ các quy định của pháp luật, quy định, hướng dẫn của YooLife liên quan đến xử lý Dữ liệu cá nhân của Khách hàng.</li>
    <li>Cung cấp đầy đủ, trung thực, chính xác Dữ liệu cá nhân, các thông tin khác theo yêu cầu của YooLife khi đăng ký và sử dụng dịch vụ của YooLife và khi có thay đổi về các thông tin này. YooLife sẽ tiến hành bảo mật Dữ liệu cá nhân của Khách hàng căn cứ trên thông tin Khách hàng đã đăng ký, do đó nếu có bất kỳ thông tin sai lệch nào YooLife sẽ không chịu trách nhiệm trong trường hợp thông tin đó làm ảnh hưởng hoặc hạn chế quyền lợi của Khách hàng. Trường hợp không thông báo, nếu có phát sinh rủi ro, tổn thất thì Khách hàng chịu trách nhiệm về những sai sót hay hành vi lợi dụng, lừa đảo khi sử dụng dịch vụ do lỗi của mình hoặc do không cung cấp đúng, đầy đủ, chính xác, kịp thời sự thay đổi thông tin; bao gồm cả thiệt hại về tài chính, chi phí phát sinh do thông tin cung cấp sai hoặc không thống nhất.</li>
    <li>Phối hợp với YooLife, cơ quan nhà nước có thẩm quyền hoặc bên thứ ba trong trường hợp phát sinh các vấn đề ảnh hưởng đến tính bảo mật Dữ liệu cá nhân của Khách hàng.</li>
    <li>Tự bảo vệ dữ liệu cá nhân của mình; chủ động áp dụng các biện pháp nhằm bảo vệ Dữ liệu cá nhân của mình trong quá trình sử dụng dịch vụ của YooLife; thông báo kịp thời cho YooLife khi phát hiện thấy có sai sót, nhầm lẫn về Dữ liệu cá nhân của mình hoặc nghi ngờ Dữ liệu cá nhân của mình đang bị xâm phạm.</li>
    <li>Tự chịu trách nhiệm đối với những thông tin, dữ liệu, chấp thuận mà mình tạo lập, cung cấp trên môi trường mạng; tự chịu trách nhiệm trong trường hợp dữ liệu cá nhân bị rò rỉ, xâm phạm do lỗi của mình.</li>
    <li>Thường xuyên cập nhật các Quy định, Chính sách của YooLife trong từng thời kỳ được thông báo tới Khách hàng hoặc đăng tải trên các Ứng dụng và hoặc các kênh giao dịch khác của YooLife từng thời kỳ. Thực hiện các hành động theo hướng dẫn của YooLife để thể hiện rõ việc chấp thuận hoặc không chấp thuận đối với các mục đích xử lý Dữ liệu cá nhân mà YooLife thông báo tới Khách hàng trong từng thời kỳ.</li>
    <li>Tôn trọng, bảo vệ dữ liệu cá nhân của người khác.</li>
    <li>Các trách nhiệm khác theo quy định của pháp luật.</li>
</ul>
<p>&nbsp;</p>
<p><strong>Điều 10. Lưu trữ dữ liệu cá nhân</strong></p>
<p>YooLife cam kết sẽ chỉ lưu trữ dữ liệu cá nhân của Khách hàng trong trường hợp liên quan đến các mục đích được nêu trong Chính sách này. YooLife cũng có thể cần lưu trữ dữ liệu cá nhân của quý khách trong một giai đoạn thời gian, chẳng hạn như khi pháp luật hiện hành yêu cầu.</p>
<p>&nbsp;</p>
<p><strong>Điều 11. Xử lý dữ liệu cá nhân có yếu tố nước ngoài</strong></p>
<p>11.1. Nhằm thực hiện mục đích xử lý dữ liệu cá nhân tại Chính sách này, YooLife có thể phải cung cấp/chia sẻ dữ liệu cá nhân của Khách hàng đến các bên thứ ba liên quan của YooLife và các bên thứ ba này có thể tại Việt Nam hoặc bất cứ địa điểm nào khác nằm ngoài lãnh thổ Việt Nam.</p>
<p>11.2. Khi thực hiện việc cung cấp/chia sẻ dữ liệu cá nhân ra nước ngoài, YooLife sẽ yêu cầu bên tiếp nhận đảm bảo rằng dữ liệu cá nhân của Khách hàng được chuyển giao cho họ sẽ bảo mật và an toàn. YooLife đảm bảo tuân thủ các nghĩa vụ pháp lý và quy định liên quan đến việc chuyển giao dữ liệu cá nhân của Khách hàng.</p>
<p>11.3 Khách hàng tại Liên Minh Châu Âu (EU): Dữ liệu cá nhân của Khách hàng có thể được&nbsp; truy cập, chuyển giao và/hoặc lưu trữ bên ngoài Khu vực Kinh tế Châu Âu (EEA), bao gồm cả các quốc gia có thể có mức độ bảo vệ dữ liệu thấp hơn theo luật bảo vệ dữ liệu của EU. YooLife phải tuân thủ các quy tắc cụ thể khi chuyển Dữ liệu Cá nhân từ bên trong EEA ra bên ngoài EEA. Khi đó, YooLife sẽ sử dụng các biện pháp bảo vệ thích hợp để bảo vệ mọi Dữ liệu Cá nhân được chuyển giao.</p>
<p>&nbsp;</p>
<p><strong>Điều 12. Cookies</strong></p>
<p>12.1. Khi Khách hàng sử dụng hoặc truy cập các Ứng dụng, trang tin trực tuyến (sau đây gọi chung là “trang tin điện tử”) của YooLife, YooLife có thể đặt một hoặc nhiều cookie trên thiết bị của Khách hàng. “Cookie” là một tệp nhỏ được đặt trên thiết bị của Khách hàng khi Khách hàng truy cập một trang tin điện tử, nó ghi lại thông tin về thiết bị, trình duyệt của Khách hàng và trong một số trường hợp, sở thích và thói quen duyệt tin điện tử của Khách hàng. YooLife có thể sử dụng thông tin này để nhận diện Khách hàng khi Khách hàng quay lại các trang tin điện tử của YooLife, để cung cấp các dịch vụ được cá nhân hóa trên các trang tin điện tử của YooLife, để biên soạn số liệu phân tích nhằm hiểu rõ hơn về hoạt động của trang tin điện tử và để cải thiện các trang tin điện tử của YooLife. Khách hàng có thể sử dụng cài đặt trình duyệt của mình để xóa hoặc chặn cookie trên thiết bị của mình. Tuy nhiên, nếu Khách hàng quyết định không chấp nhận hoặc chặn cookie từ các trang tin điện tử của YooLife, Khách hàng có thể không tận dụng hết tất cả các tính năng của các trang tin điện tử của YooLife.</p>
<p>12.2. YooLife có thể xử lý thông tin cá nhân của Khách hàng thông qua công nghệ cookie, theo các quy định của Điều khoản này. YooLife cũng có thể sử dụng biện pháp tiếp thị lại để phân phát quảng cáo cho những cá nhân mà YooLife biết trước đây đã truy cập trang tin điện tử của mình.</p>
<p>12.3. Trong phạm vi các bên thứ ba đã gán nội dung lên trên các trang tin điện tử của YooLife (ví dụ: các tính năng truyền thông xã hội), các bên thứ ba đó có thể thu thập thông tin cá nhân của Khách hàng (ví dụ: dữ liệu cookie) nếu Khách hàng chọn tương tác với nội dung của bên thứ ba đó hoặc sử dụng các dịch vụ của bên thứ ba.</p>
<p>&nbsp;</p>
<p><strong>Điều 13. Thông tin liên hệ xử lý dữ liệu cá nhân</strong></p>
<p>Trường hợp Khách hàng có bất kỳ câu hỏi nào liên quan đến Chính sách này hoặc các vấn đề liên quan đến quyền của chủ thể dữ liệu hoặc xử lý dữ liệu cá nhân của Khách hàng, Khách hàng hàng có thể sử dụng các hình thức liên hệ nêu sau:</p>
<p><span style="color:#d32f2f;">Gửi thư về YooLife theo địa chỉ: info@yootek.vn</span></p>
<p><span style="color:#d32f2f;">Hotline: 077 924 0938</span></p>
<p>&nbsp;</p>
<p><strong>Điều 14. Điều khoản chung</strong></p>
<p>14.1. Chính sách này có hiệu lực từ ngày 01/08/2023. Khách hàng hiểu và đồng ý rằng, Chính sách này có thể được sửa đổi theo từng thời kỳ và được thông báo tới Khách hàng thông qua các Kênh giao dịch của YooLife trước khi áp dụng. Những thay đổi và thời điểm có hiệu lực sẽ được cập nhật và công bố tại các Kênh giao dịch và các kênh khác của YooLife. Việc Khách hàng tiếp tục sử dụng dịch vụ sau thời hạn thông báo về các nội dung sửa đổi, bổ sung trong từng thời kỳ đồng nghĩa với việc Khách hàng đã chấp nhận các nội dung sửa đổi, bổ sung đó.</p>
<p>14.2. Khách hàng đã biết rõ và đồng ý bản Chính sách này cũng là Thông báo xử lý dữ liệu cá nhân quy định tại Điều 13 Nghị định 13/NĐ-CP/2023 và được sửa đổi, bổ sung trong từng thời kỳ trước khi YooLife tiến hành Xử lý dữ liệu cá nhân. Theo đó. YooLife không cần thực hiện thêm bất kỳ biện pháp nào khác nằm mục đích thông báo việc Xử lý dữ liệu cá nhân cho Khách hàng.</p>
<p>14.3. Khách hàng cam kết thực hiện nghiêm túc các quy định tại Chính sách này. Các vấn đề chưa được quy định, các Bên thống nhất thực hiện theo quy định của pháp luật, hướng dẫn của cơ quan Nhà nước có thẩm quyền và/hoặc các sửa đổi, bổ sung Chính sách này được YooLife thông báo cho Khách hàng trong từng thời kỳ.</p>
<p>14.4. Khách hàng có thể thấy quảng cáo hoặc nội dung khác trên bất kỳ trang tin điện tử, ứng dụng hoặc thiết bị nào có thể liên kết đến các trang tin điện tử hoặc dịch vụ của các đối tác, nhà quảng cáo, nhà tài trợ hoặc các bên thứ ba khác.</p>
<p>YooLife không kiểm soát nội dung hoặc các liên kết xuất hiện trên các trang tin điện tử hoặc dịch vụ của bên thứ ba và không chịu trách nhiệm hoặc/và trách nhiệm pháp lý đối với các hoạt động được sử dụng bởi các trang tin điện tử hoặc dịch vụ của bên thứ ba được liên kết đến hoặc từ bất kỳ trang tin điện tử, ứng dụng hoặc thiết bị nào. Các trang tin điện tử và dịch vụ này có thể tuân theo các chính sách bảo mật và điều khoản sử dụng của riêng của bên thứ ba.</p>
<p>14.5. Chính sách này được giao kết trên cơ sở thiện chí giữa YooLife và Khách hàng. Trong quá trình thực hiện nếu phát sinh tranh chấp, các Bên sẽ chủ động giải quyết thông qua thương lượng, hòa giải. Trường hợp hòa giải không thành, tranh chấp sẽ được đưa ra Tòa án nhân dân có thẩm quyền để giải quyết theo quy định của pháp luật.</p>`;
  return (
    <ScrollView style={{backgroundColor: 'white', paddingHorizontal: 10}}>
      <StatusBar barStyle={'dark-content'} />
      <View style={{paddingTop: 50}}>
        <RenderHTML
          source={{html: policy}}
          contentWidth={width}
          defaultTextProps={{
            style: {
              color: 'black',
            },
          }}
        />
      </View>
    </ScrollView>
  );
};

export default PrivatePolicyScreen;
