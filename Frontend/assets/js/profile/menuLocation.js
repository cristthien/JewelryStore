document.addEventListener("DOMContentLoaded", function () {
  const provinceButton = document.getElementById("province-button");
  const districtButton = document.getElementById("district-button");
  var provinceMenu = document.getElementById("province");
  var districtMenu = document.getElementById("district");
  const addressInput = document.getElementById("address");
  const activeProvinceButton = document.querySelector(".province-button");
  const activeDistrictButton = document.querySelector(".district-button");
  const dropdownMenu = document.querySelector(".dropdown-menu");

  function activateProvince() {
    activeProvinceButton.classList.add("active");
    if (activeDistrictButton.classList.contains("active")) {
      activeDistrictButton.classList.remove("active");
    }
  }

  function activateDistrict() {
    if (activeProvinceButton.classList.contains("active")) {
      activeProvinceButton.classList.remove("active");
    }
    activeDistrictButton.classList.add("active");
  }

  // Định nghĩa hàm xử lý sự kiện
  function provinceButtonClickHandler() {
    provinceMenu.style.display = "block";
    districtMenu.style.display = "none";
    activateProvince();
  }

  // Định nghĩa hàm xử lý sự kiện
  function districtButtonClickHandler() {
    provinceMenu.style.display = "none";
    districtMenu.style.display = "block";
    activateDistrict();
  }

  provinceButton.addEventListener("click", provinceButtonClickHandler);

  // Danh sách tỉnh/thành phố của Việt Nam
  var provinces = [
    "An Giang",
    "Bà Rịa-Vũng Tàu",
    "Bạc Liêu",
    "Bắc Giang",
    "Bắc Kạn",
    "Bắc Ninh",
    "Bến Tre",
    "Bình Định",
    "Bình Dương",
    "Bình Phước",
    "Bình Thuận",
    "Cà Mau",
    "Cần Thơ (thành phố)",
    "Cao Bằng",
    "Đà Nẵng (thành phố)",
    "Đắk Lắk",
    "Đắk Nông",
    "Điện Biên",
    "Đồng Nai",
    "Đồng Tháp",
    "Gia Lai",
    "Hà Giang",
    "Hà Nam",
    "Hà Nội",
    "Hà Tĩnh",
    "Hải Dương",
    "Hải Phòng",
    "Hậu Giang",
    "Hòa Bình",
    "Thành phố Hồ Chí Minh",
    "Hưng Yên",
    "Khánh Hòa",
    "Kiên Giang",
    "Kon Tum",
    "Lai Châu",
    "Lâm Đồng",
    "Lạng Sơn",
    "Lào Cai",
    "Long An",
    "Nam Định",
    "Nghệ An",
    "Ninh Bình",
    "Ninh Thuận",
    "Phú Thọ",
    "Phú Yên",
    "Quảng Bình",
    "Quảng Nam",
    "Quảng Ngãi",
    "Quảng Ninh",
    "Quảng Trị",
    "Sóc Trăng",
    "Sơn La",
    "Tây Ninh",
    "Thái Bình",
    "Thái Nguyên",
    "Thanh Hóa",
    "Thừa Thiên-Huế",
    "Tiền Giang",
    "Trà Vinh",
    "Tuyên Quang",
    "Vĩnh Long",
    "Vĩnh Phúc",
    "Yên Bái",
  ];

  // Tạo các phần tử div cho từng tỉnh/thành phố và thêm vào div có id="province"
  provinces.forEach(function (province) {
    var provinceItem = document.createElement("div");
    provinceItem.className = "dropdown-item province-item";
    provinceItem.textContent = province;
    provinceMenu.appendChild(provinceItem);

    provinceItem.addEventListener("click", function () {
      var selectedProvince = provinceItem.textContent.trim();
      addressInput.value = selectedProvince;
      districtButtonClickHandler();
      districtButton.addEventListener("click", districtButtonClickHandler);

      // Nếu province là An Giang, tạo danh sách district của An Giang
      if (selectedProvince === "An Giang") {
        // Danh sách quận/huyện của An Giang
        var districts = [
          "Châu Phú",
          "Châu Thành",
          "Chợ Mới",
          "Phú Tân",
          "Tân Châu",
          "Thoại Sơn",
          "Tri Tôn",
          "An Phú",
          "Tịnh Biên",
          "Long Xuyên (thành phố)",
          "Châu Đốc (thành phố)",
        ];
      } else if (selectedProvince === "Bà Rịa-Vũng Tàu") {
        // Danh sách quận/huyện của Bà Rịa-Vũng Tàu
        var districts = [
          "Bà Rịa (thành phố)",
          "Vũng Tàu (thành phố)",
          "Châu Đức",
          "Xuyên Mộc",
          "Long Điền",
          "Đất Đỏ",
          "Tân Thành",
          "Côn Đảo (thị xã)",
        ];
      } else if (selectedProvince === "Bạc Liêu") {
        districts = [
          "Thành phố Bạc Liêu",
          "Thị xã Giá Rai",
          "Huyện Đông Hải",
          "Huyện Hòa Bình",
          "Huyện Hồng Dân",
          "Huyện Phước Long",
          "Huyện Vĩnh Lợi",
        ];
      } else if (selectedProvince === "Bắc Giang") {
        districts = [
          "Huyện Yên Thế",
          "Huyện Yên Dũng",
          "Huyện Việt Yên",
          "Huyện Tân Yên",
          "Huyện Sơn Động",
          "Huyện Lục Ngạn",
          "Huyện Lục Nam",
          "Huyện Lạng Giang",
          "Huyện Hiệp Hòa",
          "Thành phố Bắc Giang",
        ];
      } else if (selectedProvince === "Bắc Kạn") {
        districts = [
          "Huyện Pác Nặm",
          "Huyện Ngân Sơn",
          "Huyện Na Rì",
          "Huyện Chợ Mới",
          "Huyện Chợ Đồn",
          "Huyện Bạch Thông",
          "Thành phố Bắc Kạn",
          "Huyện Ba Bể",
        ];
      } else if (selectedProvince === "Bắc Ninh") {
        districts = [
          "Huyện Yên Phong",
          "Thành phố Từ Sơn",
          "Huyện Tiên Du",
          "Huyện Thuận Thành",
          "Huyện Quế Võ",
          "Huyện Lương Tài",
          "Huyện Gia Bình",
          "Thành phố Bắc Ninh",
        ];
      } else if (selectedProvince === "Bến Tre") {
        districts = [
          "Huyện Thạnh Phú",
          "Huyện Mỏ Cày Nam",
          "Huyện Mỏ Cày Bắc",
          "Huyện Giồng Trôm",
          "Huyện Chợ Lách",
          "Huyện Châu Thành",
          "Huyện Bình Đại",
          "Thành phố Bến Tre",
          "Huyện Ba Tri",
        ];
      } else if (selectedProvince === "Bình Dương") {
        districts = [
          "Thành phố Thuận An",
          "Thành phố Thủ Dầu Một",
          "Thị xã Tân Uyên",
          "Huyện Phú Giáo",
          "Thành phố Dĩ An",
          "Huyện Dầu Tiếng",
          "Thị xã Bến Cát",
          "Huyện Bàu Bàng",
          "Huyện Bắc Tân Uyên",
        ];
      } else if (selectedProvince === "Bình Định") {
        districts = [
          "Huyện Vĩnh Thạnh",
          "Huyện Vân Canh",
          "Huyện Tuy Phước",
          "Huyện Tây Sơn",
          "Thành phố Quy Nhơn",
          "Huyện Phù Mỹ",
          "Huyện Phù Cát",
          "Thị xã Hoài Nhơn",
          "Huyện Hoài Ân",
          "Thị xã An Nhơn",
          "Huyện An Lão",
        ];
      } else if (selectedProvince === "Bình Phước") {
        districts = [
          "Thị xã Phước Long",
          "Huyện Phú Riềng",
          "Huyện Lộc Ninh",
          "Huyện Hớn Quản",
          "Thành phố Đồng Xoài",
          "Huyện Đồng Phú",
          "Huyện Chơn Thành",
          "Huyện Bù Gia Mập",
          "Huyện Bù Đốp",
          "Huyện Bù Đăng",
          "Thị xã Bình Long",
        ];
      } else if (selectedProvince === "Bình Thuận") {
        districts = [
          "Huyện Tuy Phong",
          "Huyện Tánh Linh",
          "Huyện Phú Quý",
          "Thành phố Phan Thiết",
          "Thị xã La Gi",
          "Huyện Hàm Thuận Nam",
          "Huyện Hàm Thuận Bắc",
          "Huyện Hàm Tân",
          "Huyện Đức Linh",
          "Huyện Bắc Bình",
        ];
      } else if (selectedProvince === "Cà Mau") {
        districts = [
          "Huyện U Minh",
          "Huyện Trần Văn Thời",
          "Huyện Thới Bình",
          "Huyện Phú Tân",
          "Huyện Ngọc Hiển",
          "Huyện Năm Căn",
          "Huyện Đầm Dơi",
          "Huyện Cái Nước",
          "Thành phố Cà Mau",
        ];
      } else if (selectedProvince === "Cao Bằng") {
        districts = [
          "Huyện Trùng Khánh",
          "Huyện Thạch An",
          "Huyện Quảng Hòa",
          "Huyện Nguyên Bình",
          "Huyện Hòa An",
          "Huyện Hà Quảng",
          "Huyện Hạ Lang",
          "Thành phố Cao Bằng",
          "Huyện Bảo Lâm",
          "Huyện Bảo Lạc",
        ];
      } else if (selectedProvince === "Cần Thơ (thành phố)") {
        districts = [
          "Huyện Vĩnh Thạnh",
          "Quận Thốt Nốt",
          "Huyện Thới Lai",
          "Huyện Phong Điền",
          "Quận Ô Môn",
          "Quận Ninh Kiều",
          "Huyện Cờ Đỏ",
          "Quận Cái Răng",
          "Quận Bình Thủy",
        ];
      } else if (selectedProvince === "Đà Nẵng (thành phố)") {
        districts = [
          "Quận Thanh Khê",
          "Quận Sơn Trà",
          "Quận Ngũ Hành Sơn",
          "Quận Liên Chiểu",
          "Huyện Hoàng Sa",
          "Huyện Hòa Vang",
          "Quận Hải Châu",
          "Quận Cẩm Lệ",
        ];
      } else if (selectedProvince === "Đắk Lắk") {
        // Danh sách quận/huyện của Đắk Lắk
        var districts = [
          "Thành phố Buôn Ma Thuột",
          "Huyện Ea H'leo",
          "Huyện Ea Súp",
          "Huyện Buôn Đôn",
          "Huyện Krông Buk",
          "Huyện Krông Năng",
          "Huyện Krông Pắc",
          "Huyện Lắk",
          "Huyện M'Đrắk",
          "Huyện Cư M'gar",
          "Huyện Krông Ana",
          "Huyện Krông Bông",
          "Huyện Krông Nô",
          "Huyện Cư Kuin",
          "Thị xã Buôn Hồ",
          "Thị xã Ea Kar",
        ];
      } else if (selectedProvince === "Đắk Nông") {
        // Danh sách quận/huyện của Đắk Nông
        var districts = [
          "Thị xã Gia Nghĩa",
          "Huyện Đắk R'lấp",
          "Huyện Đắk Song",
          "Huyện Krông Nô",
          "Huyện Tuy Đức",
          "Huyện Đắk Mil",
          "Huyện Krông Nô",
          "Huyện Đắk Glong",
          "Huyện Cư Jút",
          "Huyện Đắk Đoa",
        ];
      } else if (selectedProvince === "Điện Biên") {
        // Danh sách quận/huyện của Điện Biên
        var districts = [
          "Thành phố Điện Biên Phủ",
          "Huyện Điện Biên",
          "Huyện Điện Biên Đông",
          "Huyện Mường Ảng",
          "Huyện Mường Chà",
          "Huyện Mường Nhé",
          "Huyện Mường Lay",
          "Huyện Tủa Chùa",
          "Huyện Tuần Giáo",
          "Huyện Nậm Pồ",
        ];
      } else if (selectedProvince === "Đồng Nai") {
        // Danh sách quận/huyện của Đồng Nai
        var districts = [
          "Thành phố Biên Hòa",
          "Thành phố Long Khánh",
          "Huyện Long Thành",
          "Huyện Xuân Lộc",
          "Huyện Nhơn Trạch",
          "Huyện Trảng Bom",
          "Huyện Thống Nhất",
          "Huyện Cẩm Mỹ",
          "Huyện Tân Phú",
          "Huyện Vĩnh Cửu",
          "Huyện Định Quán",
          "Huyện Thị xã Long Điền",
          "Huyện Thị xã Phước Long",
        ];
      } else if (selectedProvince === "Gia Lai") {
        // Danh sách quận/huyện của Gia Lai
        var districts = [
          "Thành phố Pleiku",
          "Huyện Chư Pưh",
          "Huyện Chư Prông",
          "Huyện Chư Sê",
          "Huyện Đak Đoa",
          "Huyện Đak Pơ",
          "Huyện Đức Cơ",
          "Huyện Ia Grai",
          "Huyện Ia Pa",
          "Huyện K'Bang",
          "Huyện Kông Chro",
          "Huyện Krông Pa",
          "Huyện Mang Yang",
          "Huyện Phú Thiện",
        ];
      } else if (selectedProvince === "Hà Giang") {
        var districts = [
          "Thành phố Hà Giang",
          "Huyện Bắc Mê",
          "Huyện Bắc Quang",
          "Huyện Đồng Văn",
          "Huyện Hoàng Su Phì",
          "Huyện Mèo Vạc",
          "Huyện Quản Bạ",
          "Huyện Quang Bình",
          "Huyện Vị Xuyên",
          "Huyện Xín Mần",
          "Huyện Yên Minh",
        ];
      } else if (selectedProvince === "Hà Nam") {
        var districts = [
          "Thành phố Phủ Lý",
          "Huyện Bình Lục",
          "Huyện Duy Tiên",
          "Huyện Kim Bảng",
          "Huyện Lý Nhân",
          "Huyện Thanh Liêm",
          "Huyện Văn Lâm",
          "Huyện Yên Mỹ",
        ];
      } else if (selectedProvince === "Hà Nội") {
        var districts = [
          "Quận Ba Đình",
          "Quận Bắc Từ Liêm",
          "Quận Cầu Giấy",
          "Quận Đống Đa",
          "Quận Hà Đông",
          "Quận Hai Bà Trưng",
          "Quận Hoàn Kiếm",
          "Quận Hoàng Mai",
          "Quận Long Biên",
          "Quận Nam Từ Liêm",
          "Quận Tây Hồ",
          "Quận Thanh Xuân",
          "Huyện Ba Vì",
          "Huyện Chương Mỹ",
          "Huyện Đan Phượng",
          "Huyện Đông Anh",
          "Huyện Gia Lâm",
          "Huyện Hoài Đức",
          "Huyện Mê Linh",
          "Huyện Mỹ Đức",
          "Huyện Phú Xuyên",
          "Huyện Phúc Thọ",
          "Huyện Quốc Oai",
          "Huyện Sóc Sơn",
          "Huyện Thạch Thất",
          "Huyện Thanh Oai",
          "Huyện Thường Tín",
          "Huyện Ứng Hòa",
          "Thị xã Sơn Tây",
        ];
      } else if (selectedProvince === "Hải Dương") {
        var districts = [
          "Thành phố Hải Dương",
          "Thị xã Chí Linh",
          "Huyện Bình Giang",
          "Huyện Cẩm Giàng",
          "Huyện Gia Lộc",
          "Huyện Kim Thành",
          "Huyện Kinh Môn",
          "Huyện Nam Sách",
          "Huyện Ninh Giang",
          "Huyện Thanh Hà",
          "Huyện Thanh Miện",
          "Huyện Tứ Kỳ",
          "Huyện Văn Lâm",
        ];
      } else if (selectedProvince === "Hải Phòng") {
        var districts = [
          "Quận Hồng Bàng",
          "Quận Ngô Quyền",
          "Quận Lê Chân",
          "Quận Hải An",
          "Quận Kiến An",
          "Quận Đồ Sơn",
          "Quận Dương Kinh",
          "Huyện An Dương",
          "Huyện An Lão",
          "Huyện Bạch Long Vĩ",
          "Huyện Cát Hải",
          "Huyện Kiến Thụy",
          "Huyện Thủy Nguyên",
          "Huyện Tiên Lãng",
          "Huyện Vĩnh Bảo",
        ];
      } else if (selectedProvince === "Hậu Giang") {
        var districts = [
          "Thành phố Vị Thanh",
          "Thành phố Ngã Bảy",
          "Thị xã Nga Bảy",
          "Huyện Châu Thành",
          "Huyện Châu Thành A",
          "Huyện Long Mỹ",
          "Huyện Phụng Hiệp",
          "Huyện Vị Thuỷ",
        ];
      } else if (selectedProvince === "Hòa Bình") {
        var districts = [
          "Thành phố Hòa Bình",
          "Huyện Đà Bắc",
          "Huyện Cao Phong",
          "Huyện Kim Bôi",
          "Huyện Lạc Sơn",
          "Huyện Lạc Thủy",
          "Huyện Mai Châu",
          "Huyện Tân Lạc",
          "Huyện Yên Thủy",
        ];
      } else if (selectedProvince === "Hưng Yên") {
        var districts = [
          "Thành phố Hưng Yên",
          "Huyện Ân Thi",
          "Huyện Khoái Châu",
          "Huyện Kim Động",
          "Huyện Mỹ Hào",
          "Huyện Phù Cừ",
          "Huyện Tiên Lữ",
          "Huyện Văn Giang",
          "Huyện Văn Lâm",
          "Huyện Yên Mỹ",
        ];
      } else if (selectedProvince === "Khánh Hòa") {
        var districts = [
          "Thành phố Nha Trang",
          "Thành phố Cam Ranh",
          "Thị xã Ninh Hòa",
          "Huyện Diên Khánh",
          "Huyện Cam Lâm",
          "Huyện Khánh Sơn",
          "Huyện Trường Sa",
          "Huyện Khánh Vĩnh",
          "Huyện Vạn Ninh",
        ];
      } else if (selectedProvince === "Kiên Giang") {
        var districts = [
          "Thành phố Rạch Giá",
          "Thành phố Hà Tiên",
          "Thị xã Hòn Đất",
          "Thị xã Kiên Lương",
          "Huyện An Biên",
          "Huyện An Minh",
          "Huyện Châu Thành",
          "Huyện Giang Thành",
          "Huyện Giồng Riềng",
          "Huyện Gò Quao",
          "Huyện Kiên Hải",
          "Huyện Kiên Lương",
          "Huyện Phú Quốc",
          "Huyện Tân Hiệp",
          "Huyện U Minh Thượng",
          "Huyện Vĩnh Thuận",
        ];
      } else if (selectedProvince === "Kon Tum") {
        var districts = [
          "Thành phố Kon Tum",
          "Huyện Đắk Glei",
          "Huyện Đắk Hà",
          "Huyện Đắk Tô",
          "Huyện Kon Plông",
          "Huyện Kon Rẫy",
          "Huyện Ngọc Hồi",
          "Huyện Sa Thầy",
          "Huyện Tu Mơ Rông",
        ];
      } else if (selectedProvince === "Lai Châu") {
        var districts = [
          "Thành phố Lai Châu",
          "Huyện Bắc Hà",
          "Huyện Bảo Thắng",
          "Huyện Bảo Yên",
          "Huyện Phong Thổ",
          "Huyện Sìn Hồ",
          "Huyện Tam Đường",
          "Huyện Than Uyên",
          "Huyện Tân Uyên",
        ];
      } else if (selectedProvince === "Lạng Sơn") {
        var districts = [
          "Thành phố Lạng Sơn",
          "Huyện Bắc Sơn",
          "Huyện Bình Gia",
          "Huyện Cao Lộc",
          "Huyện Chi Lăng",
          "Huyện Đình Lập",
          "Huyện Hữu Lũng",
          "Huyện Lộc Bình",
          "Huyện Tràng Định",
          "Huyện Văn Bàn",
          "Huyện Văn Lãng",
        ];
      } else if (selectedProvince === "Lào Cai") {
        var districts = [
          "Thành phố Lào Cai",
          "Huyện Bắc Hà",
          "Huyện Bảo Thắng",
          "Huyện Bảo Yên",
          "Huyện Bát Xát",
          "Huyện Mường Khương",
          "Huyện Sa Pa",
          "Huyện Si Ma Cai",
          "Huyện Văn Bàn",
        ];
      } else if (selectedProvince === "Lâm Đồng") {
        var districts = [
          "Thành phố Đà Lạt",
          "Thị xã Bảo Lộc",
          "Thị xã Đam Rông",
          "Huyện Bảo Lâm",
          "Huyện Cát Tiên",
          "Huyện Đạ Huoai",
          "Huyện Đạ Tẻh",
          "Huyện Đạ Đờn",
          "Huyện Lạc Dương",
          "Huyện Lâm Hà",
          "Huyện Đức Trọng",
          "Huyện Đơn Dương",
        ];
      } else if (selectedProvince === "Long An") {
        var districts = [
          "Thành phố Tân An",
          "Thị xã Kiến Tường",
          "Huyện Bến Lức",
          "Huyện Cần Đước",
          "Huyện Cần Giuộc",
          "Huyện Châu Thành",
          "Huyện Đức Hòa",
          "Huyện Đức Huệ",
          "Huyện Mộc Hóa",
          "Huyện Tân Hưng",
          "Huyện Tân Thạnh",
          "Huyện Tân Trụ",
          "Huyện Thạnh Hóa",
          "Huyện Thủ Thừa",
          "Huyện Vĩnh Hưng",
        ];
      } else if (selectedProvince === "Nam Định") {
        var districts = [
          "Thành phố Nam Định",
          "Huyện Giao Thủy",
          "Huyện Hải Hậu",
          "Huyện Mỹ Lộc",
          "Huyện Nam Trực",
          "Huyện Nghĩa Hưng",
          "Huyện Trực Ninh",
          "Huyện Vụ Bản",
          "Huyện Xuân Trường",
          "Huyện Ý Yên",
        ];
      } else if (selectedProvince === "Nghệ An") {
        var districts = [
          "Thành phố Vinh",
          "Thị xã Cửa Lò",
          "Huyện Anh Sơn",
          "Huyện Con Cuông",
          "Huyện Diễn Châu",
          "Huyện Đô Lương",
          "Huyện Hưng Nguyên",
          "Huyện Kỳ Sơn",
          "Huyện Nam Đàn",
          "Huyện Nghi Lộc",
          "Huyện Nghĩa Đàn",
          "Huyện Quế Phong",
          "Huyện Quỳ Châu",
          "Huyện Quỳ Hợp",
          "Huyện Quỳnh Lưu",
          "Huyện Tân Kỳ",
          "Huyện Thanh Chương",
          "Huyện Tương Dương",
          "Huyện Yên Thành",
        ];
      } else if (selectedProvince === "Ninh Bình") {
        var districts = [
          "Thành phố Ninh Bình",
          "Thị xã Tam Điệp",
          "Huyện Gia Viễn",
          "Huyện Hoa Lư",
          "Huyện Kim Sơn",
          "Huyện Nho Quan",
          "Huyện Yên Khánh",
          "Huyện Yên Mô",
        ];
      } else if (selectedProvince === "Ninh Thuận") {
        var districts = [
          "Thành phố Phan Rang - Tháp Chàm",
          "Huyện Bác Ái",
          "Huyện Ninh Hải",
          "Huyện Ninh Phước",
          "Huyện Ninh Sơn",
          "Huyện Thuận Bắc",
          "Huyện Thuận Nam",
        ];
      } else if (selectedProvince === "Quảng Bình") {
        var districts = [
          "Thành phố Đồng Hới",
          "Thị xã Ba Đồn",
          "Huyện Bố Trạch",
          "Huyện Lệ Thủy",
          "Huyện Minh Hóa",
          "Huyện Quảng Ninh",
          "Huyện Quảng Trạch",
          "Huyện Tuyên Hóa",
        ];
      } else if (selectedProvince === "Quảng Nam") {
        var districts = [
          "Thành phố Hội An",
          "Thành phố Tam Kỳ",
          "Huyện Bắc Trà My",
          "Huyện Đại Lộc",
          "Huyện Điện Bàn",
          "Huyện Đông Giang",
          "Huyện Duy Xuyên",
          "Huyện Hiệp Đức",
          "Huyện Nam Giang",
          "Huyện Nam Trà My",
          "Huyện Nông Sơn",
          "Huyện Núi Thành",
          "Huyện Phú Ninh",
          "Huyện Phước Sơn",
          "Huyện Quế Sơn",
          "Huyện Tây Giang",
          "Huyện Thăng Bình",
          "Huyện Tiên Phước",
          "Huyện Núi Thành",
        ];
      } else if (selectedProvince === "Quảng Ngãi") {
        var districts = [
          "Thành phố Quảng Ngãi",
          "Thị xã Đức Phổ",
          "Huyện Ba Tơ",
          "Huyện Bình Sơn",
          "Huyện Đức Phổ",
          "Huyện Lý Sơn",
          "Huyện Minh Long",
          "Huyện Mộ Đức",
          "Huyện Nghĩa Hành",
          "Huyện Sơn Hà",
          "Huyện Sơn Tịnh",
          "Huyện Tây Trà",
          "Huyện Trà Bồng",
          "Huyện Tư Nghĩa",
        ];
      } else if (selectedProvince === "Quảng Ninh") {
        var districts = [
          "Thành phố Hạ Long",
          "Thành phố Móng Cái",
          "Thị xã Cẩm Phả",
          "Huyện Bái Cháy",
          "Huyện Bình Liêu",
          "Huyện Cô Tô",
          "Huyện Đầm Hà",
          "Huyện Đông Triều",
          "Huyện Hải Hà",
          "Huyện Tiên Yên",
          "Huyện Vân Đồn",
        ];
      } else if (selectedProvince === "Quảng Trị") {
        var districts = [
          "Thành phố Đông Hà",
          "Thị xã Quảng Trị",
          "Huyện Cam Lộ",
          "Huyện Cồn Cỏ",
          "Huyện Đakrông",
          "Huyện Gio Linh",
          "Huyện Hải Lăng",
          "Huyện Hướng Hóa",
          "Huyện Triệu Phong",
          "Huyện Vĩnh Linh",
        ];
      } else if (selectedProvince === "Sóc Trăng") {
        var districts = [
          "Thành phố Sóc Trăng",
          "Thị xã Vĩnh Châu",
          "Huyện Châu Thành",
          "Huyện Cù Lao Dung",
          "Huyện Kế Sách",
          "Huyện Long Phú",
          "Huyện Mỹ Tú",
          "Huyện Mỹ Xuyên",
          "Huyện Ngã Năm",
          "Huyện Thạnh Trị",
          "Huyện Trần Đề",
        ];
      } else if (selectedProvince === "Sơn La") {
        var districts = [
          "Thành phố Sơn La",
          "Huyện Bắc Yên",
          "Huyện Mộc Châu",
          "Huyện Mai Sơn",
          "Huyện Mường La",
          "Huyện Phù Yên",
          "Huyện Quỳnh Nhai",
          "Huyện Sốp Cộp",
          "Huyện Sông Mã",
          "Huyện Thuận Châu",
          "Huyện Vân Hồ",
          "Huyện Yên Châu",
        ];
      } else if (selectedProvince === "Tây Ninh") {
        var districts = [
          "Thành phố Tây Ninh",
          "Thị xã Tân Châu",
          "Huyện Bến Cầu",
          "Huyện Châu Thành",
          "Huyện Dương Minh Châu",
          "Huyện Gò Dầu",
          "Huyện Hòa Thành",
          "Huyện Tân Biên",
          "Huyện Tân Châu",
          "Huyện Trảng Bàng",
        ];
      } else if (selectedProvince === "Thái Bình") {
        var districts = [
          "Thành phố Thái Bình",
          "Huyện Đông Hưng",
          "Huyện Hưng Hà",
          "Huyện Kiến Xương",
          "Huyện Quỳnh Phụ",
          "Huyện Thái Thụy",
          "Huyện Tiền Hải",
          "Huyện Vũ Thư",
        ];
      } else if (selectedProvince === "Thái Nguyên") {
        var districts = [
          "Thành phố Thái Nguyên",
          "Thành phố Sông Công",
          "Huyện Đại Từ",
          "Huyện Định Hóa",
          "Huyện Đồng Hỷ",
          "Huyện Phổ Yên",
          "Huyện Phú Bình",
          "Huyện Phú Lương",
          "Huyện Võ Nhai",
        ];
      } else if (selectedProvince === "Thanh Hóa") {
        var districts = [
          "Thành phố Sầm Sơn",
          "Thành phố Thanh Hóa",
          "Huyện Bá Thước",
          "Huyện Bỉm Sơn",
          "Huyện Cẩm Thủy",
          "Huyện Đông Sơn",
          "Huyện Hà Trung",
          "Huyện Hậu Lộc",
          "Huyện Hoằng Hóa",
          "Huyện Lang Chánh",
          "Huyện Mường Lát",
          "Huyện Nga Sơn",
          "Huyện Nghi Sơn",
          "Huyện Ngọc Lặc",
          "Huyện Như Thanh",
          "Huyện Như Xuân",
          "Huyện Nông Cống",
          "Huyện Quan Hóa",
          "Huyện Quan Sơn",
          "Huyện Quảng Xương",
          "Huyện Sầm Sơn",
          "Huyện Thạch Thành",
          "Huyện Thiệu Hóa",
          "Huyện Thọ Xuân",
          "Huyện Thường Xuân",
          "Huyện Triệu Sơn",
          "Huyện Vĩnh Lộc",
          "Huyện Yên Định",
        ];
      } else if (selectedProvince === "Thành phố Hồ Chí Minh") {
        var districts = [
          "Thủ Đức",
          "Tân Phú",
          "Tân Bình",
          "Quận 12",
          "Quận 11",
          "Quận 10",
          "Quận 8",
          "Quận 7",
          "Quận 6",
          "Quận 5",
          "Quận 4",
          "Quận 3",
          "Quận 1",
          "Phú Nhuận",
          "Nhà Bè",
          "Hóc Môn",
          "Gò Vấp",
          "Củ Chi",
          "Cần Giờ",
          "Bình Thạnh",
          "Bình Tân",
          "Bình Chánh",
        ];
      } else if (selectedProvince === "Thừa Thiên-Huế") {
        var districts = [
          "Thành phố Huế",
          "Huyện A Lưới",
          "Huyện Nam Đông",
          "Huyện Phong Điền",
          "Huyện Phú Lộc",
          "Huyện Phú Vang",
          "Huyện Quảng Điền",
        ];
      } else if (selectedProvince === "Tiền Giang") {
        var districts = [
          "Thành phố Mỹ Tho",
          "Thị xã Gò Công",
          "Huyện Cai Lậy",
          "Huyện Châu Thành",
          "Huyện Chợ Gạo",
          "Huyện Gò Công Đông",
          "Huyện Gò Công Tây",
          "Huyện Tân Phước",
          "Huyện Tân Phú Đông",
          "Huyện Tân Thạnh",
          "Huyện Tân Trụ",
        ];
      } else if (selectedProvince === "Trà Vinh") {
        var districts = [
          "Thành phố Trà Vinh",
          "Huyện Càng Long",
          "Huyện Cầu Kè",
          "Huyện Châu Thành",
          "Huyện Cầu Ngang",
          "Huyện Duyên Hải",
          "Huyện Tiểu Cần",
          "Huyện Trà Cú",
        ];
      } else if (selectedProvince === "Tuyên Quang") {
        var districts = [
          "Yên Sơn",
          "Tuyên Quang",
          "Sơn Dương",
          "Na Hang",
          "Lâm Bình",
          "Hàm Yên",
          "Chiêm Hóa",
        ];
      } else if (selectedProvince === "Vĩnh Long") {
        var districts = [
          "Vũng Liêm",
          "Vĩnh Long",
          "Trà Ôn",
          "Tam Bình",
          "Mang Thít",
          "Long Hồ",
          "Bình Tân",
          "Bình Minh",
        ];
      } else if (selectedProvince === "Vĩnh Phúc") {
        var districts = [
          "Yên Lạc",
          "Vĩnh Yên",
          "Vĩnh Tường",
          "Tam Dương",
          "Tam Đảo",
          "Sông Lô",
          "Phúc Yên",
          "Lập Thạch",
          "Bình Xuyên",
        ];
      } else if (selectedProvince === "Yên Bái") {
        var districts = [
          "Yên Bình",
          "Yên Bái",
          "Văn Yên",
          "Văn Chấn",
          "Trấn Yên",
          "Trạm Tấu",
          "Nghĩa Lộ",
          "Mù Cang Chải",
          "Lục Yên",
        ];
      }

      // Xóa tất cả các phần tử con của districtMenu
      districtMenu.innerHTML = "";
      // Tạo các phần tử div cho từng quận/huyện và thêm vào div có id="district"
      districts.forEach(function (district) {
        var districtItem = document.createElement("div");
        districtItem.className = "dropdown-item district-item";
        districtItem.textContent = district;
        districtMenu.appendChild(districtItem);
      });
    });
  });

  // Xử lý khi chọn district
  districtMenu.addEventListener("click", function (e) {
    if (e.target && e.target.nodeName === "DIV") {
      const selectedDistrict = e.target.textContent.trim();
      const currentAddressValue = addressInput.value.split(",")[0];
      addressInput.value = currentAddressValue + ", " + selectedDistrict;
    }
    districtButton.removeEventListener("click", districtButtonClickHandler);
    dropdownMenu.classList.remove("show");
  });
});
