import type { Product } from "@/types";

export const productData: Product[] = [
    {
        id: "1",
        name: "Classic White T-Shirt",
        description: "Soft cotton T-shirt for everyday wear.",
        price: 25,
        sale_price: 20,
        category: "clothing",
        sizes: ["S", "M", "L", "XL"],
        colors: ["White", "Black", "Gray"],
        images: [
            "https://pronk.in/cdn/shop/files/PRONK00423.jpg?v=1722063628",
            "https://image.hm.com/assets/hm/65/f3/65f341ff366c1b91cdf32811ad64d6124c7ce4dc.jpg?imwidth=2160",
            "https://media.landmarkshops.in/cdn-cgi/image/h=730,w=540,q=85,fit=cover/lifestyle/1000015124848-White-OffWhite-1000015124848_05-2100.jpg"
        ],
        stock: 15,
        featured: true,
        rating: 4.5,
        tags: ["tshirt", "casual", "cotton"]
    },
    {
        id: "2",
        name: "Denim Jeans",
        description: "Slim fit blue denim jeans.",
        price: 60,
        category: "clothing",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Blue", "Black"],
        images: [
            "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80"
        ],
        stock: 30,
        featured: true,
        rating: 4.2,
        tags: ["jeans", "denim"]
    },
    {
        id: "3",
        name: "Running Shoes",
        description: "Lightweight shoes for daily running and workouts.",
        price: 85,
        sale_price: 70,
        category: "shoes",
        sizes: ["M", "L", "XL"],
        colors: ["Red", "Black", "LightBlue"],
        images: [
            "https://png.pngtree.com/png-clipart/20241104/original/pngtree-running-shoes-or-sneakers-png-image_16681362.png"
        ],
        stock: 50,
        featured: true,
        rating: 4.7,
        tags: ["shoes", "running", "sports"]
    },
    {
        id: "4",
        name: "Leather Handbag",
        description: "Premium leather handbag with modern design.",
        price: 120,
        category: "bags",
        colors: ["Brown", "Black"],
        images: [
            "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80"
        ],
        stock: 10,
        featured: true,
        rating: 4.8,
        tags: ["handbag", "leather", "accessories"]
    },
    {
        id: "5",
        name: "Gold Hoop Earrings",
        description: "Elegant 18K gold plated hoop earrings.",
        price: 45,
        category: "jewelry",
        colors: ["Gold"],
        images: [
            "https://png.pngtree.com/png-clipart/20241028/original/pngtree-gold-hoop-earrings-with-round-ornament-clipart-illustration-png-image_16525281.png"
        ],
        stock: 25,
        featured: false,
        rating: 4.6,
        tags: ["earrings", "gold", "jewelry"]
    },
    {
        id: "6",
        name: "Summer Dress",
        description: "Lightweight floral dress for summer outings.",
        price: 75,
        sale_price: 60,
        category: "clothing",
        sizes: ["S", "M", "L"],
        colors: ["Yellow", "Pink", "White"],
        images: [
            "https://img.favpng.com/11/12/13/summer-dress-floral-summer-dress-LrDYx9uR_t.jpg"
        ],
        stock: 12,
        featured: true,
        rating: 4.3,
        tags: ["dress", "summer", "floral"]
    },
    {
        id: "7",
        name: "Casual Sneakers",
        description: "Stylish sneakers perfect for daily casual wear.",
        price: 90,
        category: "shoes",
        sizes: ["M", "L", "XL"],
        colors: ["White", "Navy", "LightBlue", "LightGray"],
        images: [
            "https://5.imimg.com/data5/SELLER/Default/2025/1/478538095/JD/VX/SE/237597165/sos0012-500x500.png",
            "https://5.imimg.com/data5/SELLER/Default/2025/1/478538109/SR/VO/LH/237597165/sos0012-1000x1000.png",
            "https://5.imimg.com/data5/SELLER/Default/2025/1/478538106/CV/PM/LY/237597165/sos0012-1000x1000.png",
            "https://5.imimg.com/data5/SELLER/Default/2025/1/478538103/FX/UA/IO/237597165/sos0012-1000x1000.png",
            "https://5.imimg.com/data5/SELLER/Default/2025/1/478538090/NJ/KB/TY/237597165/sos0012-1000x1000.png",
            "https://5.imimg.com/data5/SELLER/Default/2025/1/478538093/PW/AY/YN/237597165/sos0012-1000x1000.png"
        ],
        stock: 18,
        featured: false,
        rating: 4.4,
        tags: ["sneakers", "casual"]
    },
    {
        id: "8",
        name: "Wool Scarf",
        description: "Warm wool scarf for winter.",
        price: 35,
        category: "accessories",
        colors: ["Gray", "Red", "Beige"],
        images: [
            "https://static.vecteezy.com/system/resources/previews/048/783/108/non_2x/a-knitted-scarf-free-png.png",
        ],
        stock: 40,
        featured: false,
        rating: 4.1,
        tags: ["scarf", "winter", "wool"]
    },
    {
        id: "9",
        name: "Leather Belt",
        description: "Durable leather belt with metallic buckle.",
        price: 28,
        category: "accessories",
        colors: ["Black", "Brown"],
        images: [
            "https://m.media-amazon.com/images/I/61n+502A1fL._UY1000_.jpg",
            "https://i.ebayimg.com/images/g/tkkAAOSwiCNighf4/s-l400.jpg",
            "https://i.ebayimg.com/images/g/RMcAAOSwoblnNEWI/s-l1200.jpg",
        ],
        stock: 20,
        featured: false,
        rating: 4.0,
        tags: ["belt", "leather"]
    },
    {
        id: "10",
        name: "Sports Watch",
        description: "Water-resistant digital watch with multiple features.",
        price: 150,
        sale_price: 120,
        category: "accessories",
        colors: ["Black", "Green"],
        images: [
            "https://atlas-content-cdn.pixelsquid.com/stock-images/sport-watch-generic-smart-NxPMV31-600.jpg",
            "https://atlas-content-cdn.pixelsquid.com/stock-images/sport-watch-generic-smart-rvn1VRA-600.jpg",

        ],
        stock: 8,
        featured: true,
        rating: 4.9,
        tags: ["watch", "sports", "digital"]
    },

    // Mobile Section
    {
        id: "11",
        name: "iPhone 13 Pro",
        description: "Apple iPhone 13 Pro with A15 Bionic chip, ProMotion display, and advanced triple-camera system.",
        price: 999,
        sale_price: 949,
        category: "electronics",
        sizes: ["128GB", "256GB", "512GB", "1TB"],
        colors: ["Graphite", "Silver", "Gold", "Sierra Blue"],
        images: [
            "https://www.ls.graphics/avif-proxy/https%3A%2F%2Fcdn.prod.website-files.com%2F625816a3416990dd61391b9b%2F6759bb456a7ebfd0aa9e3f67_670a928c1420c81b83eb6a8a_67050eb09031263809896522_66deb017897d4dbdaaa2dbf8_646b68085f7ff1456cbe9de3_009_Blue.avif",
            "https://www.ls.graphics/avif-proxy/https%3A%2F%2Fcdn.prod.website-files.com%2F625816a3416990dd61391b9b%2F6759bb456a7ebfd0aa9e3f8c_670a928d1420c81b83eb6a92_67050eb09031263809896528_66deb017897d4dbdaaa2dbf5_646b68085f7ff1456cbe9de8_009_Silver.avif",
            "https://www.ls.graphics/avif-proxy/https%3A%2F%2Fcdn.prod.website-files.com%2F625816a3416990dd61391b9b%2F6759bb456a7ebfd0aa9e3f59_670a928c1420c81b83eb6a87_67050eb0903126380989652d_66deb017897d4dbdaaa2dbef_646b68085f7ff1456cbe9de0_009_Graphite.avif",
            "https://www.ls.graphics/avif-proxy/https%3A%2F%2Fcdn.prod.website-files.com%2F625816a3416990dd61391b9b%2F6759bb456a7ebfd0aa9e3f55_670a928d1420c81b83eb6a8e_67050eb0903126380989651c_66deb017897d4dbdaaa2dbfb_646b68085f7ff1456cbe9dda_009_Gold.avif",
            "https://www.ls.graphics/avif-proxy/https%3A%2F%2Fcdn.prod.website-files.com%2F625816a3416990dd61391b9b%2F6759badf604e2f0288a0b8da_670a91f4641a1e6cc25d997b_67050e34116b11a2d3a40f08_66deafbc3173256786a51150_6491d8f51ce35c87427c1864_iPhone-13-Mockups-002_Starlight.avif",
            "https://www.ls.graphics/avif-proxy/https%3A%2F%2Fcdn.prod.website-files.com%2F625816a3416990dd61391b9b%2F6759badf604e2f0288a0b8d7_670a91f4641a1e6cc25d9976_67050e34116b11a2d3a40f00_66deafbc3173256786a5121b_6491d8f51ce35c87427c185e_iPhone-13-Mockups-002_Midnight.avif"
        ],
        stock: 30,
        featured: true,
        rating: 4.9,
        tags: ["iphone", "apple", "smartphone", "electronics"]
    },
    {
        id: "12",
        name: "OnePlus 12 5G",
        description: "OnePlus 12 5G smartphone with Snapdragon 8 Gen 3, Fluid AMOLED display, and Hasselblad triple camera system.",
        price: 799,
        sale_price: 749,
        category: "electronics",
        sizes: ["128GB", "256GB", "512GB"],
        colors: ["Eternal Green", "Titanium Black", "Flowy Emerald"],
        images: [
            "https://www.ls.graphics/avif-proxy/https%3A%2F%2Fcdn.prod.website-files.com%2F625816a3416990dd61391b9b%2F665dc984c6ba30d8c080ad5b_006.avif",
            "https://www.ls.graphics/avif-proxy/https%3A%2F%2Fcdn.prod.website-files.com%2F625816a3416990dd61391b9b%2F6759b72239b6b0204d1b4532_670a8fd2b6f735f454eeb377_67050bf8e7c4ac9218ee991f_66deabc6ff0e32507e707540_665dc97c99a40298f935f17b_005.avif",
            "https://www.ls.graphics/avif-proxy/https%3A%2F%2Fcdn.prod.website-files.com%2F625816a3416990dd61391b9b%2F665dc984fd6d4441f77872ac_007.avif",
            "https://www.ls.graphics/avif-proxy/https%3A%2F%2Fcdn.prod.website-files.com%2F625816a3416990dd61391b9b%2F6759b721c15a3eb17afb69cd_670a8fd11b09b4d35718780e_67050c03214d175148832e38_66deabc5647f66428158dea3_665dc98f222ff4a6809f8571_009.avif",
            "https://www.ls.graphics/avif-proxy/https%3A%2F%2Fcdn.prod.website-files.com%2F625816a3416990dd61391b9b%2F6759b722f59f0d61e0112e0e_670a8fd131a658cd85d9a4eb_67050bf7fc101bd24d8ec637_66deabc6647f66428158def5_665dc98fb0bcd30e328cad91_008.avif",
            "https://www.ls.graphics/avif-proxy/https%3A%2F%2Fcdn.prod.website-files.com%2F625816a3416990dd61391b9b%2F665dc9724aa90c5c53cd03f1_003.avif"
        ],
        stock: 40,
        featured: true,
        rating: 4.8,
        tags: ["oneplus", "android", "smartphone", "electronics"]
    },
    {
        id: "15",
        name: "Dell XPS 15",
        description: "Dell XPS 15 laptop with Intel Core i7, 16GB RAM, 512GB SSD, and 15.6-inch 4K OLED display.",
        price: 1599,
        sale_price: 1499,
        category: "electronics",
        sizes: ["16GB RAM / 512GB SSD", "32GB RAM / 1TB SSD"],
        colors: ["Platinum Silver", "Frost White"],
        images: [
            "https://www.ls.graphics/avif-proxy/https%3A%2F%2Fcdn.prod.website-files.com%2F625816a3416990dd61391b9b%2F675e016ddd5e9cf8e6297c53_6443e2cbeae6eae7cbd4c20f_631f44889965813b94bf9804_Realistic-02.avif",
            "https://www.ls.graphics/avif-proxy/https%3A%2F%2Fcdn.prod.website-files.com%2F625816a3416990dd61391b9b%2F675e016ddd5e9cf8e6297cdd_6443e2cbeae6ea1196d4c208_631f4494c2501db939d2eb2a_Realistic-14.avif",
            "https://www.ls.graphics/avif-proxy/https%3A%2F%2Fcdn.prod.website-files.com%2F625816a3416990dd61391b9b%2F675e016ddd5e9cf8e6297c44_6443e2cbeae6ea04c3d4c205_631f4487ea26caa00010c1b6_Realistic-10.avif",
            "https://www.ls.graphics/avif-proxy/https%3A%2F%2Fcdn.prod.website-files.com%2F625816a3416990dd61391b9b%2F675e016ddd5e9cf8e6297c6c_6443e2cbeae6ea0bf0d4c20b_631f44886abf85553409691c_Realistic-07.avif",
            "https://www.ls.graphics/avif-proxy/https%3A%2F%2Fcdn.prod.website-files.com%2F625816a3416990dd61391b9b%2F675e016ddd5e9cf8e6297c7e_6443e2cbeae6eae65fd4c20d_631f449402fd10c2a0dd33a8_Realistic-16.avif"
        ],
        stock: 25,
        featured: true,
        rating: 4.6,
        tags: ["laptop", "dell", "electronics", "workstation"]
    },
    {
        id: "18",
        name: "Apple Watch Series 9",
        description: "Apple Watch Series 9 with Always-On Retina display, advanced health tracking, and seamless integration with iPhone.",
        price: 399,
        sale_price: 369,
        category: "electronics",
        sizes: ["41mm", "45mm"],
        colors: ["Midnight", "Starlight", "Silver", "Product Red"],
        images: [
            "https://www.ls.graphics/avif-proxy/https%3A%2F%2Fcdn.prod.website-files.com%2F625816a3416990dd61391b9b%2F6759bb6b6c96c2ecb8e51958_670a930447b883828da00bcc_67050f2fd70866e51eaa7d25_66deb09429328f86447061b8_641062859564a36f0f1358da_017_Titanium-Case-with-Midnight-Ocean-Band.avif",
            "https://www.ls.graphics/avif-proxy/https%3A%2F%2Fcdn.prod.website-files.com%2F625816a3416990dd61391b9b%2F6759bb6bc62de088417ed7b9_670a93054ec8d5eeb63aab08_67050f2eb1e0f9be8572dafd_66deb0947dd63621b97048d9_64106285b75f2547b8aec044_020_Titanium-Case-with-Midnight-Ocean-Band.avif",
            "https://www.ls.graphics/avif-proxy/https%3A%2F%2Fcdn.prod.website-files.com%2F625816a3416990dd61391b9b%2F6759bb6c38977997252e7fd1_670a930631a658cd85dc22c8_67050f2f96bdc0b07a0fe804_66deb095897d4dbdaaa3403b_64106282e19d822482318c3d_014_Titanium-Case-with-Midnight-Ocean-Band.avif",
            "https://www.ls.graphics/avif-proxy/https%3A%2F%2Fcdn.prod.website-files.com%2F625816a3416990dd61391b9b%2F6759bb6d191accf05e53e9c8_670a9307bb067d45c2529039_67050f324dc8008a790901be_66deb098342817163f93eeda_64106281d2646c2adc46b5b4_009_Titanium-Case-with-Midnight-Ocean-Band.avif",
            "https://www.ls.graphics/avif-proxy/https%3A%2F%2Fcdn.prod.website-files.com%2F625816a3416990dd61391b9b%2F6759bb6d678eb520553202a2_670a9308e809b53b5ff49b1f_67050f333e436a9573956fe9_66deb096ddf35bfa068a7293_64106281e2cc321fd56d9422_008_Titanium-Case-with-Midnight-Ocean-Band.avif",
            "https://www.ls.graphics/avif-proxy/https%3A%2F%2Fcdn.prod.website-files.com%2F625816a3416990dd61391b9b%2F6759bb6cbe65e74a1810d147_670a93071fd9efa87fc66aa9_67050f334f300dd640197a71_66deb0966110f91eb2135565_64106282e2cc326edc6d942a_013_Titanium-Case-with-Midnight-Ocean-Band.avif",
        ],
        stock: 45,
        featured: true,
        rating: 4.7,
        tags: ["apple", "watch", "wearable", "electronics"]
    },
    {
        id: "20",
        name: "iPhone 16 Pro",
        description: "Apple iPhone 16 Pro with A18 Bionic chip, advanced ProMotion XDR display, and next-gen triple-camera system with improved low-light performance.",
        price: 1199,
        sale_price: 1149,
        category: "electronics",
        sizes: ["128GB", "256GB", "512GB", "1TB"],
        colors: ["Black", "Gray", "Pink", "Blue"],
        images: [
            "https://www.ls.graphics/avif-proxy/https%3A%2F%2Fcdn.prod.website-files.com%2F625816a3416990dd61391b9b%2F675dff61ae3152c8036589d0_67483458839d5a6eaf988b1d_File23.avif",
            "https://www.ls.graphics/avif-proxy/https%3A%2F%2Fcdn.prod.website-files.com%2F625816a3416990dd61391b9b%2F67569ccddbd57ec229637ea0_Black_800-023.avif",
            "https://www.ls.graphics/avif-proxy/https%3A%2F%2Fcdn.prod.website-files.com%2F625816a3416990dd61391b9b%2F6759b65ffa256a7a72938e4b_67569ccd5126c72a66a30806_Black_800-021.avif",
            "https://www.ls.graphics/avif-proxy/https%3A%2F%2Fcdn.prod.website-files.com%2F625816a3416990dd61391b9b%2F6759b662d4b2a6b67dab8bd0_67569cc940f9887072169197_Black_800-003.avif",
            "https://www.ls.graphics/avif-proxy/https%3A%2F%2Fcdn.prod.website-files.com%2F625816a3416990dd61391b9b%2F6759b6622b45e52d3e5eaa0b_67569cc9865da3dddc8e1066_Black_800-005.avif",
            "https://www.ls.graphics/avif-proxy/https%3A%2F%2Fcdn.prod.website-files.com%2F625816a3416990dd61391b9b%2F6759b661cebaf7a0f0752dc5_67569cca1da766907dab1bd7_Black_800-009.avif",
        ],
        stock: 35,
        featured: true,
        rating: 4.9,
        tags: ["iphone", "apple", "smartphone", "electronics"]
    },
    {
        id: "22",
        name: "Samsung Galaxy Tab S9",
        description: "Samsung Galaxy Tab S9 with Dynamic AMOLED 2X display, Snapdragon 8 Gen 2 processor, S Pen support, and all-day battery life.",
        price: 899,
        sale_price: 849,
        category: "electronics",
        sizes: ["128GB", "256GB", "512GB"],
        colors: ["Graphite", "Beige", "Navy"],
        images: [
            "https://www.ls.graphics/cdn-cgi/image/format=avif,quality=90/https://cdn.prod.website-files.com/625816a3416990dd61391b9b/686ae3a01036f1084e266640_small-img-04.jpg",
            "https://www.ls.graphics/cdn-cgi/image/format=avif,quality=90/https://cdn.prod.website-files.com/625816a3416990dd61391b9b/686510332a41e8276ce26550_021.jpeg",
            "https://www.ls.graphics/cdn-cgi/image/format=avif,quality=90/https://cdn.prod.website-files.com/625816a3416990dd61391b9b/68651033784e3833dcf1ee70_023.jpeg",
            "https://www.ls.graphics/cdn-cgi/image/format=avif,quality=90/https://cdn.prod.website-files.com/625816a3416990dd61391b9b/68651032103190526e00417e_015.jpeg",
            "https://www.ls.graphics/cdn-cgi/image/format=avif,quality=90/https://cdn.prod.website-files.com/625816a3416990dd61391b9b/6865103156b42af592fd9062_013.jpeg",
            "https://www.ls.graphics/cdn-cgi/image/format=avif,quality=90/https://cdn.prod.website-files.com/625816a3416990dd61391b9b/6865102fe2e4a076c8679ca6_006.jpeg",
        ],
        stock: 28,
        featured: false,
        rating: 4.6,
        tags: ["samsung", "tablet", "android", "electronics"]
    },
    {
        id: "25",
        name: "Men's Classic Hoodie",
        description: "Comfortable cotton hoodie with adjustable drawstring hood and front kangaroo pocket. Perfect for casual wear or workouts.",
        price: 50,
        sale_price: 40,
        category: "clothing",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Black", "Gray", "Navy", "Red"],
        images: [
            "https://www.ls.graphics/avif-proxy/https%3A%2F%2Fcdn.prod.website-files.com%2F625816a3416990dd61391b9b%2F6759b791f59f0d61e0118c26_670a903ea4eb5b2aed058829_67050c851c91e551973f9fe2_66deac2acdc1f2a9ba7d3fae_651aba2d6c6ed99c3db2f29b_003-hoodie.avif"
        ],
        stock: 60,
        featured: true,
        rating: 4.5,
        tags: ["hoodie", "men", "clothing", "casual"]
    },
    {
        id: "26",
        name: "Men's Casual Sweatshirt",
        description: "Comfortable and stylish sweatshirt made with soft cotton blend, perfect for casual outings and workouts.",
        price: 45,
        sale_price: 35,
        category: "clothing",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Black", "Gray", "Navy Blue", "Maroon"],
        images: [
            "https://www.ls.graphics/avif-proxy/https%3A%2F%2Fcdn.prod.website-files.com%2F625816a3416990dd61391b9b%2F6759b78de9498c75ee0cc969_670a903b68fd9554b414a6a4_67050c8044bc0ae259c9ad31_66deac259b602e1b2f7fbdc0_651aba35c9f70f8faf9be90e_008-high-necked-sweatshirt.avif"
        ],
        stock: 60,
        featured: true,
        rating: 4.5,
        tags: ["sweatshirt", "men", "clothing", "casual"]
    },
    {
        id: "27",
        name: "Classic Hoodie",
        description: "Comfortable cotton-blend hoodie with soft interior, perfect for casual wear and layering.",
        price: 60,
        sale_price: 50,
        category: "clothing",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Gray", "Light Gray"],
        images: [
            "https://www.ls.graphics/avif-proxy/https%3A%2F%2Fcdn.prod.website-files.com%2F625816a3416990dd61391b9b%2F6759b7900ea41c6ce1c52ada_670a903e512f6099631218d7_67050c84bd328193d3d3326e_66deac2a5c323e7291491272_651aba2d646aced39a32441b_005-hoodie.avif"
        ],
        stock: 75,
        featured: true,
        rating: 4.5,
        tags: ["hoodie", "clothing", "casual", "winter"]
    },
    {
        id: "28",
        name: "Men's Casual Jeans",
        description: "Stylish and comfortable men's casual jeans made with high-quality denim. Perfect for everyday wear.",
        price: 45,
        sale_price: 39,
        category: "clothing",
        sizes: ["30", "32", "34", "36", "38"],
        colors: ["Blue", "Dark Blue", "Black"],
        images: [
            "https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/64ae98497cc98b368835b645/1a0833c7-726a-41dc-98fb-bb8af5a239ad-removebg-preview.png"
        ],
        stock: 60,
        featured: true,
        rating: 4.4,
        tags: ["jeans", "menswear", "casual", "denim"]
    },
    {
        id: "30",
        name: "Men's Checked Shirt",
        description: "Casual men's shirt with classic check pattern, made from soft cotton for all-day comfort.",
        price: 35,
        sale_price: 30,
        category: "clothing",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Blue", "Gray", "Red", "Orange", "Black"],
        images: [
            "https://img.freepik.com/free-photo/shirt_1203-8194.jpg?semt=ais_hybrid&w=740&q=80",
            "https://img.freepik.com/premium-photo/black-white-plaid-shirt-with-white-background_874909-899.jpg",
            "https://img.freepik.com/premium-photo/man-wearing-plaid-shirt-that-says-he-is-wearing-plaid-shirt_874909-15447.jpg",
            "https://img.freepik.com/premium-photo/blue-white-plaid-shirt-hangs-front-white-background_874909-1865.jpg",
            "https://img.freepik.com/premium-photo/blue-white-plaid-shirt-is-hanging-up-against-white-background_874909-1228.jpg?w=360",
            "https://img.freepik.com/premium-photo/red-plaid-shirt-with-white-background-word-word-it_874909-560.jpg"
        ],
        stock: 80,
        featured: true,
        rating: 4.5,
        tags: ["shirt", "checked", "menswear", "casual"]
    },
    {
        id: "33",
        name: "Bella Vita Perfume",
        description: "Elegant fragrance with floral and fruity notes, designed to leave a lasting impression. Perfect for daily wear or special occasions.",
        price: 120,
        sale_price: 99,
        category: "beauty",
        sizes: ["50ml", "100ml"],
        colors: ["Black", "Brown"],
        images: [
            "https://www.bbassets.com/media/uploads/p/xxl/40315429_2-bella-vita-luxury-unisex-perfume-gift-set-for-men-women.jpg",
            "https://i5.walmartimages.com/seo/Bella-Vita-Organic-Man-Perfume-Gift-Set-for-Men-Luxury-Scent-with-Long-Lasting-Fragrance-4x20-ml-Perfumes_45591f41-fe00-488c-9f31-4cc1ee4ea8b3.bb518b6ca6c63593a1cb21f82e9695ef.jpeg",
            "https://m.media-amazon.com/images/I/41PIGBhfQ+L._UF1000,1000_QL80_.jpg"
        ],
        stock: 40,
        featured: true,
        rating: 4.7,
        tags: ["perfume", "fragrance", "beauty", "bella vita"]
    },
    {
        id: "36",
        name: "Samsung Smart TV 55\"",
        description: "Samsung 55-inch 4K UHD Smart TV with Crystal Display, built-in streaming apps, and HDR support for an immersive viewing experience.",
        price: 699,
        sale_price: 649,
        category: "electronics",
        sizes: ["55inch"],
        colors: ["Black", "Gray", "Silver"],
        images: [
            "https://www.pngkey.com/png/detail/250-2501153_samsung-55-inch-ku7000-4k-uhd-smart-tv.png"
        ],
        stock: 20,
        featured: true,
        rating: 4.6,
        tags: ["samsung", "smart tv", "electronics", "4k"]
    },
    {
        id: "37",
        name: "Smart Glasses",
        description: "Next-gen smart glasses with augmented reality display, voice control, and built-in audio for an immersive experience.",
        price: 499,
        sale_price: 449,
        category: "electronics",
        sizes: ["Standard"],
        colors: ["Black", "Silver"],
        images: [
            "https://atlas-content-cdn.pixelsquid.com/stock-images/smart-glasses-WEGqwyE-600.jpg"
        ],
        stock: 30,
        featured: true,
        rating: 4.6,
        tags: ["smart glasses", "wearable", "electronics", "AR"]
    }














];
