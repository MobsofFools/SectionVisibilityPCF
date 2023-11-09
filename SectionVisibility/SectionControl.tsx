import React, { useEffect, useState, useRef } from 'react';
import { IInputs } from "./generated/ManifestTypes";
import { Icon } from '@fluentui/react';

export type ISectionControlProps = {
    context?: ComponentFramework.Context<IInputs>;
    onChange:(bool:boolean) => void;
}
const uglyBlue = '#0066FF'
const SectionControl = (props:ISectionControlProps)=> {
    const {context, onChange} = props;
    const controlInitialValue = context?.parameters?.controllerValue.raw!;
    //const [controlValue, setControlValue] = useState<boolean>(controlInitialValue? controlInitialValue : false);
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
                onChange(!controlInitialValue);
              }
              // If enter is pressed, activate the button
              else if (event.key === "Enter") {
                event.preventDefault();
                onChange(!controlInitialValue);
              
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
    // function handleExpandAllEvent(e:Event){
    //     onChange(true)
    // }
    // function handleCollapseAllEvent(e:Event){
    //     onChange(false)
    // }
    // function handleExpandSectionsEvent(e:CustomEvent){
    //     console.log(e);
    //     const expandArray:Array<string>|null = e.detail;
    //     if(expandArray?.includes(`${context?.parameters.controllerValue.attributes?.LogicalName}`)){
    //         onChange(true);
    //     }
    // }
    // function registerExternalExpandCollapseListeners(){
    //     window.top?.addEventListener("expandall",handleExpandAllEvent)
    //     window.top?.addEventListener("collapseall",handleCollapseAllEvent)
    //     window.top?.addEventListener<any>("expandsections",handleExpandSectionsEvent)
    // }
    // function registerInitialExternalExpandCollapseListeners(){
    //     setTimeout(()=>{
    //         registerExternalExpandCollapseListeners();
    //     },5000)
    // }
  
    useEffect(()=>{
        onChange(controlInitialValue)
        const control = document.getElementById(`${context?.parameters.controllerValue.attributes?.LogicalName}_pcf_control`);
        control?.addEventListener('keyup',handleSpaceKeyupEvent)
        control?.addEventListener('keydown',handleAccessibilityKeydownEvent)
        return () => {
            control?.removeEventListener('keydown',handleAccessibilityKeydownEvent)
            control?.removeEventListener('keyup',handleSpaceKeyupEvent)
        }
    },[controlInitialValue])
    // useEffect(()=>{
    //     registerExternalExpandCollapseListeners();
    // },[])

    return(
        <div style={{color:color, borderBottom:'1px solid', borderColor:'rgb(237,235,233)',fontFamily:'SegoeUI-Semibold',display:'flex',alignItems:"center",boxSizing:"border-box", width:"100%"}} tabIndex={0} ref={controlRef} onClick={()=>onChange(!controlInitialValue)} id={`${context?.parameters.controllerValue.attributes?.LogicalName}_pcf_control`} aria-expanded={controlInitialValue} aria-label={userLang === 1036? frLabel : engLabel} onKeyUp={handleAccessibilityKeyupEvent} title={userLang === 1036? frLabel : engLabel}>
            {
                controlInitialValue?
                <Icon iconName='CaretDownSolid8'/> :
                <Icon iconName='CaretRightSolid8'/> // style={{color:color}}
            }
            <h3 style={{color:color, marginLeft:"1rem"}}>
                {}
                {userLang === 1036? frLabel : engLabel}
            </h3>
        </div>
    )
}
export default SectionControl