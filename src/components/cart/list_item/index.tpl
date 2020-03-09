<div class="list-item">
    <div class="cell check-cell">
        {{check_box}}
    </div>
    <div class="cell img-cell">
        <img src="{{img_url}}" alt="{{goods_name}}" />
    </div>
    <div class="cell info-cell">
        <div class="title">
            <h2>{{goods_name}}</h2>
        </div>
        <div class="bottom">
            <div class="price">￥{{price}}.00</div>
            <div class="selector">
                {{num_selector}}
            </div>  
        </div>
    </div>
    <div class="cell remove-cell">
        <span class="fa fa-trash" data-id="{{id}}" data-index="{{index}}"></span>
    </div>
</div>