const day=25
const today=new Date();
today.setMinutes ( new Date ().getMinutes() + 5 );
const hour=('0'+today.getHours()).slice(-2);
const minute=('0'+today.getMinutes()).slice(-2);
var path=''
var keys=''
var clickAmount=0


async function callFuncKeys() {
    //  const godzina=await $('//form[contains(@class,"add-slot-form")]//div[contains(@class,"MuiGrid-item")][2]/input')
    const elem=await $(`${path}`)
    await elem.click() 
    await browser.keys(keys)
    browser.pause(500) 
}

async function callFuncKeysSelect(){
    const elem=await $(`${path}`)
    await elem.click() 
    let klikniec=['\uE007']
    let tab=Array.from({ length: clickAmount }, (_, idx) => 1)
    for await (const i of tab){klikniec.unshift('\uE015')}
    // for await (const i of Array.from(item[1])){klikniec1.unshift('\uE015')}
    await browser.keys(klikniec) 
    browser.pause(500) 
}



describe('My login application', ()=>{
   
    it('Should login with valid credentials',async () =>{
        

        // browser.url('https://coursecraft.net/courses/z95Wv/login')
        browser.setWindowSize(1200,960)
        browser.url('https://pwdl.erejestracja.ezdrowie.gov.pl/punkty-szczepien')
        let peselH=Array( 
           ['70042602238',0,3]

            )
        let pesel=Array( 

          
            
            )


        //#region login
        // browser.debug()

        // const button1 = $('button=Zaloguj się')
        // const divProfileCard = $('div.profil-card')
        // $('button=Zaloguj się').click()
        await browser.pause(2000)

        const el = await $('//button[contains(text(),"Zaloguj się")]')
        await el.click()

        await browser.pause(1000)
        const profilCard=await $('div.profil-card')
        await profilCard.click()

        
        const inputLogin =await $('[name="loginForm:login"]')
        const inputPass =await $('[name="loginForm:hasło"]')    
        const inputZaloguj =await $('input[value="Zaloguj się"]')    

        await inputLogin.setValue('ewamlasota')
        await inputPass.setValue('EwaM12!@')
        // await inputLogin.setValue('barbarazwiackowska')
        // await inputPass.setValue('Barbara12!@')
        await inputZaloguj.click()    
        //#endregion

        //#region datepicker and filters
        const grafikTd=await $('//table//td[last()]')
        await grafikTd.click() 
        
        //const filters=await $('//div[contains(@class,"react-select__indicator react-select__dropdown-indicator")]')
        //await filters.click()
        //await browser.keys(['\uE015','\uE015','\uE015','\uE007'])  

       
        // await browser.keys(['\uE015','\uE015','\uE015','\uE007'])  

        
        
        const datepicker=await $('div.react-datepicker-wrapper')
        datepicker.click()
        await browser.pause(500)

        
        // const datepickerNextMonth=await $('//button[contains(@class,"react-datepicker__navigation--next")]')
        // datepickerNextMonth.click() //next month
        const datepickerDay=await $(`//div[@class="react-datepicker__month"]/div[@class="react-datepicker__week"]/div[contains(@class,"react-datepicker__day") and not(contains(@class,"react-datepicker__day--outside-month"))  and text()="${day}"]`)
        await datepickerDay.click()
        await browser.pause(1000)

        
        const filters1=await $('//div[contains(@class,"MuiGrid-container")]/div[contains(@class,"MuiGrid-item")][1]//div[contains(@class,"react-select__indicators")]')
        await filters1.click()
        await browser.keys(['\uE015','\uE007'])  
        await browser.pause(500)

        const filters2=await $('//div[contains(@class,"MuiGrid-container")]/div[contains(@class,"MuiGrid-item")][2]//div[contains(@class,"react-select__indicators")]')
        await filters2.click()
         await browser.keys(['\uE007']) //pfizer
        //await browser.keys(['\uE015','\uE007']) //moderna
    //    await browser.keys(['\uE015','\uE015','\uE007']) //astra
        await browser.pause(500)

        const filters5=await $('//div[contains(@class,"MuiGrid-container")]/div[contains(@class,"MuiGrid-item")][5]//div[contains(@class,"react-select__indicators")]')
        await filters5.click()
        await browser.keys(['\uE007']) 
        // await filters.click()
        await browser.pause(1000)    
//#endregion




        for await (const item of peselH) {
            
            // const output=await browser.call(()=>{
            //     return new Promise(resolve => {
            //         setTimeout(() => {
            //           resolve('resolved');
                     
            //         }, 4000);
            //       });
            // })
            // console.log('output', output)

            const buttonDodajTermin=await $('//button[contains(text(),"Dodaj termin")]')
            await buttonDodajTermin.click()
            browser.pause(1000)                               
            
            //dawka
            path='//form[contains(@class,"add-slot-form")]//div[contains(@class,"MuiGrid-item")][4]//div[contains(@class,"react-select__indicators")]'
            clickAmount=item[1]
            await browser.call(callFuncKeysSelect)

            //czas
            path='//form[contains(@class,"add-slot-form")]//div[contains(@class,"MuiGrid-item")][2]/input'
            keys=hour+minute
            await browser.call(callFuncKeys)

            //szczepionka
            path='//form[contains(@class,"add-slot-form")]//div[contains(@class,"MuiGrid-item")][5]//div[contains(@class,"react-select__indicators")]'
            clickAmount=item[2]
            await browser.call(callFuncKeysSelect)
        
            await browser.pause(1000)
        }

        for await (const item of pesel) {
             const terms=await $('//div[@class="timeline__inner"]/div[@class="timeline__item"]/span[@class="node secondDose"]/span[@class="vaccine-type" and text()="Pfizer"]')   //Pfizer
            // const terms=await $('//div[@class="timeline__inner"]/div[@class="timeline__item"]/span[@class="node secondDose"]/span[@class="vaccine-type" and text()="AstraZeneca"]')     //AstraZeneca
            // const terms=await $('//div[@class="timeline__inner"]/div[@class="timeline__item"]/span[@class="node secondDose"]/span[@class="vaccine-type" and text()="Moderna"]')     //Moderna
    
           if(terms)await terms.click()
           await browser.pause(500)

           const buttonDodajWizyte=await $('//button[contains(text(),"Dodaj wizytę")]')
           await buttonDodajWizyte.click()
           browser.pause(1000)

           const formInput=await $('form input')
           await formInput.click() //pesel

           await browser.keys(item)
           await browser.pause(500)
           
           const buttonSzukaj=await $('//button[contains(text(),"Szukaj")]')
           await buttonSzukaj.click()
           await browser.pause(500)
           
           const buttonWybierz=await $('//button[contains(text(),"Wybierz")]')
           await buttonWybierz.click()
           await browser.pause(500)
           
           const buttonPotwierdz=await $('//button[contains(text(),"Wybierz i potwierdź wizytę")]')
           if(await buttonPotwierdz.isExisting()){
                await buttonPotwierdz.click()
                await browser.pause(500)
           
                const buttonTak=await $('//button[contains(text(),"Potwierdź")]')
                await buttonTak.click()
                await browser.pause(2500)
           }
           
           const grafikLink= await $('//button[contains(text(),"Grafik")]')
           await grafikLink.click()
        }



       
       await  browser.pause(16000)
        
        

    })
    
})

