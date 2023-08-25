import React, { useEffect, useState, useRef } from 'react';
import { IInputs } from "./generated/ManifestTypes";
import { Icon } from '@fluentui/react';

interface CustomEvent extends Event {
    detail:string[]
}
export type ISectionControlProps = {
    context?: ComponentFramework.Context<IInputs>;
    onChange:(bool:boolean) => void;
}
const uglyBlue = '#0066FF'
const SectionControl = (props:ISectionControlProps)=> {
    const {context, onChange} = props;
    const controlInitialValue = context?.parameters?.controllerValue.raw!;
    const [controlValue, setControlValue] = useState<boolean>(controlInitialValue? controlInitialValue : false);
    const controlRef = useRef(null);
    const color = context?.parameters?.color?.raw! ? context.parameters.color.raw! : uglyBlue;
    const userLang = context?.userSettings.languageId;
    const engLabel = context?.parameters.SectionDisplayName_en.raw!;
    const frLabel = context?.parameters.SectionDisplayName_fr.raw!;
    function refIsFocused(focus:React.MutableRefObject<null>|React.MutableRefObject<HTMLDivElement>) {
        if(document.activeElement === focus.current){
            return true;
        }
        return false;
    }
    /**
 * Interacts with the control with the enter or space key.
 *
 * @param {KeyboardEvent} event
 */
    function handleAccessibilityKeydownEvent(event:KeyboardEvent){
        if(refIsFocused(controlRef)){
            if (event.key === " ") {
                event.preventDefault();
              }
              // If enter is pressed, activate the button
              else if (event.key === "Enter") {
                event.preventDefault(); 
            }
        }
    }
    function handleAccessibilityKeyupEvent(event:React.KeyboardEvent<HTMLDivElement>){
        if(refIsFocused(controlRef)){
            if (event.key === " ") {
                //event.stopPropagation();
                event.preventDefault();
                setControlValue(!controlValue);
              }
              // If enter is pressed, activate the button
              else if (event.key === "Enter") {
                event.preventDefault();
                setControlValue(!controlValue);
              
            }
        }
    }
    function handleSpaceKeyupEvent(event:KeyboardEvent){
        if(refIsFocused(controlRef)){
            if (event.key === " ") {
                event.preventDefault();
            }
        }
    }
    function handleExpandAllEvent(e:Event){
        setControlValue(true)
    }
    function handleCollapseAllEvent(e:Event){
        setControlValue(false)
    }
    function handleExpandSectionsEvent(e:CustomEvent){
        console.log(e);
        const expandArray:Array<string>|null = e.detail;
        if(expandArray?.includes(`${context?.parameters.controllerValue.attributes?.LogicalName}_pcf_control`)){
            setControlValue(true);
        }
    }
    function registerExternalExpandCollapseListeners(){
        window.top?.addEventListener("expandall",handleExpandAllEvent)
        window.top?.addEventListener("collapseall",handleCollapseAllEvent)
        window.top?.addEventListener<any>("expandsections",((e:CustomEvent)=> {handleExpandSectionsEvent(e)}))
        window.document.addEventListener("expandall",(e)=>console.log("expand"))
        window.document.addEventListener("collapseall",(e)=>console.log("collapse"))
        window.document.addEventListener("expandsections",(e)=>console.log("section"))
    }
  
    useEffect(()=>{
        onChange(controlValue)
        const control = document.getElementById(`${context?.parameters.controllerValue.attributes?.LogicalName}_pcf_control`);
        control?.addEventListener('keyup',handleSpaceKeyupEvent)
        control?.addEventListener('keydown',handleAccessibilityKeydownEvent)
        return () => {
            control?.removeEventListener('keydown',handleAccessibilityKeydownEvent)
            control?.removeEventListener('keyup',handleSpaceKeyupEvent)
        }
    },[controlValue])
    useEffect(()=>{
        registerExternalExpandCollapseListeners();
    },[])

    return(
        <div style={{color:color, borderBottom:'1px solid', borderColor:'rgb(237,235,233)',fontFamily:'SegoeUI-Semibold',display:'flex',alignItems:"center",boxSizing:"border-box", width:"100%"}} tabIndex={0} ref={controlRef} onClick={()=>setControlValue(!controlValue)} id={`${context?.parameters.controllerValue.attributes?.LogicalName}_pcf_control`} aria-label={userLang === 1036? frLabel : engLabel} onKeyUp={handleAccessibilityKeyupEvent} title={userLang === 1036? frLabel : engLabel}>
            {
                controlValue?
                <Icon iconName='CaretDownSolid8'/> :
                <Icon iconName='CaretRightSolid8'/> // style={{color:color}}
            }
            <h3 style={{color:color, marginLeft:"1rem"}}>
                {userLang === 1036? frLabel : engLabel}
            </h3>
        </div>
    )
}
export default SectionControl