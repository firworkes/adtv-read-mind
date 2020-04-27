<template>
  <div>
    <svg width="960" height="600"></svg>
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  data() {
    return {
        marge: {top:60,bottom:60,left:60,right:60}, //设置边距
        dataset: [ 250 , 210 , 170 , 130 , 90 ], //数据（表示矩形的宽度）
        rectHight: 30, // 每个矩形宽度
    }
  },
  mounted() {
    let _this = this;
    // var marge = {top:60,bottom:60,left:60,right:60}//设置边距
    // var dataset = [ 250 , 210 , 170 , 130 , 90 ];  //数据（表示矩形的宽度）
    var svg = d3.select("svg"); // 得到画布
    var g = svg.append("g") // 定义一个用来装整个图表的分组
            .attr("transform", "translate("+ this.marge.top +", " + this.marge.left +")");
    g.selectAll("rect")
     .data(this.dataset)
     .enter()
     .append("rect")
     .attr("x",20)
     .attr("y",function(d, i) {
         console.log(_this.rectHight)
         return i*_this.rectHight;
     })
     .attr("width",function(d, i) {  // 设置矩形宽度
         return d;
     })
     .attr("height", this.rectHight - 5) // 设置长
     .attr("fill", "blue") // 填充颜色
    // const str = "绑定的元素";
    // const arr = ["12", "565"]
    // var p = d3.select("body")
    //           .selectAll("p");
    // var update = p.data(arr);
    // var enter = update.enter()
    // update.text(function(d, i) {
    //     return "update:" + d + ",index:" + i;
    // })
    // var exit = update.exit()
    // exit.text(function(d, i) {
    //     return "exit"
    // })
    // var pEnter = enter.append("p")
    // pEnter.text(function(d, i) {
    // console.log(i)
    //     return "enter:"  + d + ",index:" + i;
    // })
        // p.data(arr).text(function(d, i) {
        //   return "这是第" + i + "个"+ d
        // })
    // p.datum(str).text(function(d, i) {
    //   return "第" + i + "个" + str;
    // });
    // p.text('Hello World')
  }
};
</script>

<style lang="scss" scoped>
</style>