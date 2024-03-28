import styled from 'styled-components'

// {BgCont,Cont,Input,UlCont,FailureCont,FilureImg,Heading,Button,}

export const BgCont = styled.div`
    min-height:100vh;
    height:100%;
    display:flex;
    flex-direction:column;
`
export const Cont = styled.div`
    width:90%;
    align-self:center;
`
export const Input = styled.select`
    width:45%;
    height:45px;
    padding-left:20px;
    border:1px solid #cbd5e1;
    border-radius:8px;
    outline:none;
    margin-bottom:25px;
`
export const UlCont = styled.ul`
    list-style-type:none;
    padding-left:0px;
    display:flex;
    align-items:center;
    flex-wrap:wrap;
    gap:20px;
`
export const FailureCont = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    align-self:center;
    height:70vh;
`
export const FilureImg = styled.img`
    width:30%;
`
export const Heading = styled.h1`
    color:#475569;
    font-size:${props => (props.para ? '15px' : '30px')};
    text-align:center;
    margin:0;
    padding:10px;
`
export const Button = styled.button`
    background-color:#328af2;
    border:0px;
    outline:none;
    border-radius:5px;
    color:#ffffff;
    cursor:pointer;
    width:100px;
    height:40px;
    margin-top:5px;
`
