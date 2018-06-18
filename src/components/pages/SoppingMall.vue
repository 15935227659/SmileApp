<template>
    <div>
        <div class="search-bar">
            <van-row>
                <van-col span="3">
                    <img :src="locationIcon" alt="icon" class="search-icon">
                </van-col>
                <van-col span="16">
                    <input type="text" class="search-input">
                </van-col>
                <van-col span="5">
                    <van-button size="mini">查找</van-button>
                </van-col>
            </van-row>
        </div>
        <!-- swiper img -->
        <div class="swiper-banner">
            <van-swipe :autoplay="1000">
                <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
                    <img v-lazy="banner.image" alt="" width="100%">
                </van-swipe-item>
            </van-swipe>
        </div>
        <!--type bar -->
        <div class="taye-bar">
            <div v-for="(cate,index) in category" :key="index">
                <img v-lazy="cate.image" width="100%">
                <span>{{cate.mallCategoryName}}</span>
            </div>
        </div>
        <div>
            <img v-lazy="adBanner" width="100%" alt="">
        </div>
        <!--Recommend goods area-->
        <div class="recommend-area">
            <div class="recommend-title">
                商品推荐
            </div>
            <div class="recommend-body">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(item,index) in recommendGoods" :key="index">
                        <div class="recommend-item">
                            <img :src="item.image" width="80%" />
                            <div>{{item.goodsName}}</div>
                            <div>￥{{item.price}} (￥{{item.mallPrice}})</div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <!-- 楼层 -->
        <floor-component :floorData="floor1" :floorName="floorName.floor1"></floor-component>
        <floor-component :floorData="floor2" :floorName="floorName.floor2"></floor-component>
        <floor-component :floorData="floor3" :floorName="floorName.floor3"></floor-component>
        <!-- 热卖 -->

        <div class="hot-area">
            <div class="hot-title">热卖商品</div>
            <div class="hot-goods">
                <van-list>
                    <van-row gutter="20">
                        <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
                            <goods-info :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goods-info>
                        </van-col>
                    </van-row>
                </van-list>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import 'swiper/dist/css/swiper.css'
import url from '@/serviceAPI.config.js'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import floorComponent from '../component/floorComponent'
import goodsInfo from '../component/goodsInfoComponent'
export default {
    data() {
        return {
            swiperOption: {
                slidesPerView: 3
            },
            locationIcon: require('../../assets/images/location.png'),
            bannerPicArray: [],
            category: [],
            adBanner: '',
            recommendGoods: [],
            floor1: [],
            floor2: [],
            floor3: [],
            floorName: {},
            hotGoods: []

        }
    },
    components: { swiper, swiperSlide, floorComponent, goodsInfo },
    created() {
        axios({
            url: url.getShopingMallInfo,  
            method: 'get',
        })
            .then(response => {
                if (response.status == 200) {
                    console.log(response.data.data)
                    this.category = response.data.data.category
                    this.bannerPicArray = response.data.data.slides
                    this.adBanner = response.data.data.advertesPicture.PICTURE_ADDRESS
                    this.recommendGoods = response.data.data.recommend
                    this.floor1 = response.data.data.floor1
                    this.floor2 = response.data.data.floor2
                    this.floor3 = response.data.data.floor3
                    this.floorName = response.data.data.floorName
                    this.floor2 = response.data.data.floor2
                    this.floor3 = response.data.data.floor3
                    this.hotGoods = response.data.data.hotGoods
                }

            })
            .catch(error => {
                console.log(error)
            })
    }
}
</script>

<style scoped>
.search-bar {
    height: 2.2rem;
    line-height: 2.2rem;
    background: #e5017d;
    overflow: hidden;
}

.search-icon {
    width: 70%;
    padding-top: .2rem;
    padding-left: .2rem;
}

.search-input {
    width: 100%;
    height: 1.3rem;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    border-bottom: 1px solid #fff !important;
    background: #e5017d;
    color: #fff;
}

.swiper-banner {
    width: 100%;
    clear: both;
    max-height: 15rem;
    overflow: hidden;
}

.taye-bar {
    background: #fff;
    margin: 0 0.3rem 0.3rem o.3rem;
    border-radius: .3rem;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}

.taye-bar div {
    padding: .3rem;
    font-size: 12px;
    text-align: center;
}

.recommend-area {
    background-color: #fff;
    margin-top: .3rem;
}

.recommend-title {
    border-bottom: 1px solid #eee;
    font-size: 14px;
    padding: .2rem;
    color: #e5017d;
}

.recommend-body {
    border-bottom: 1px solid #eee;
}

.recommend-item {
    width: 99%;
    border-right: 1px solid #eee;
    font-size: 12px;
    text-align: center;
}

.hot-area {
    text-align: center;
    font-size: 14px;
    height: 1.8rem;
    line-height: 1.8rem;
}
</style>