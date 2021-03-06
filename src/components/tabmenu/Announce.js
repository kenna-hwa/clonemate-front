import React from 'react';
import { Container } from '@mui/material';
import Divider from "@mui/material/Divider";
import Typography from '@mui/material/Typography';

import '../../stylesheets/More.css';
import BasicNavBar from '../nav/BasicNavBar';

function Announce(){
    
// 전체 박스 요소 변경, 스타일 변경 
    
    return (

    <form className='announce-wrap'>
      <BasicNavBar/>
      <Container maxWidth="lg" className="announce-text">

        <div  color="text.primary" variant="body2">
        Premium 구독 기능이 추가되었습니다. Premium 구독을 이용하시면 광고가 제거되고 추가
        스티커를 이용하실 수 있으며 향후 Premium 사용자만을 위한 기능을 이용하실 수 있습니다.
        모바일 기기에서 우측 상단의 세줄 버튼을 누르신 후 하단 메뉴 중에 Premium 메뉴를 이용
        하시면 구독 페이지를 보실 수 있습니다. 많은 분들의 이용 부탁드립니다. 감사합니다. <br />
        <br />
        * 기존의 앱을 유료로 구매하셨던 분들은 @mail.com으로 유료 앱 구매 영수증을 전달 주시면
        1년 구독 상품을 무료로 드립니다. 설정 앱 &gt; 계정 (최상단) &gt; 미디어 및 구입 항목 &gt;
        계정보기 &gt; 구입 내역을 통해 확인하실 수 있는 투두 리스트 구입의 스크린샷을 전달 부탁드리며 
        투두 리스트 계정 이메일 주소와 함께 부탁드립니다. 감사합니다. <br />
        <br />
            
        </div>
        <div className="announce-date" color="text.secondary" variant="body2"> 2022. 1. 17.</div>
        <Divider className="announce-divider"  light="true" />

        <div  color="text.primary" variant="body2">
        국내 통신사 문제로 이미지 파일 접근이 불가했던 문제가 해결되어 잘 동작하는 것을 확인했습니다. 
        혹시라도 스티커가 계속 보이지 않는 경우 앱 강제 종료 후 재실행을 부탁드리며 
        추가 문의가 있으시면 언제나 문의하기 기능을 통해 말씀 부탁드립니다. 감사합니다. <br />
        <br />
            
        </div>
        <div className="announce-date" color="text.secondary" variant="body2"> 2022. 1. 17.</div>
        <Divider className="announce-divider"  light="true" />

        <div  color="text.primary" variant="body2">
        현재 국내 통신사 문제로 인해 스티커 및 사진 첨부에 대한 기능에 제한이 있습니다.
        투두 리스트 측에선 상황을 계속 주시하며 조속히 해결될 수 있는 방안을 찾도록 노력하
        겠습니다. 문제가 해결되는대로 앱 내의 공지사항을 통해 알려드리도록 하겠습니다. 감사합니다. <br />
        <br />
            
        </div>
        <div className="announce-date" color="text.secondary" variant="body2"> 2022. 1. 17.</div>
        <Divider className="announce-divider"  light="true" />
      

      </Container>
    </form>
    )

}

export default Announce;