import React, { useState,useContext } from 'react';
import GlobalContext from '../context/Context';
import {db} from '../firebase.js'

import { setDoc ,doc, collection,addDoc} from 'firebase/firestore';


const OpenQuestionCard = ({ question }) => {


    const {currentUser ,quizzAnswers,setQuizzAnswers }  = useContext(GlobalContext)
    const [currentQuestion,setcurrentQuestion] = useState(0)
    const [answer , setAnswer] =useState({content:""})
    const [quizFinish , setQuizFinish] = useState(false)
    const [disable,setDisable]=useState(false)
    const phone = currentUser.phone

    const usersRef =doc(db, "users", phone)
    
    
    function nextQuestion(){
        console.log(answer)

        

        if(currentQuestion < questionsBank.length -1){

            setQuizzAnswers(pre => {
              let ob = {"question": questionsBank[currentQuestion] , "answer":answer.content}
              if (pre ==null ){
                return []
              }else{
                return pre.concat(ob)
              }
               })

            setAnswer({content:""})
            
            setcurrentQuestion(currentQuestion+1)

        }else{
            setDisable(true)
            console.log(currentUser)

            setDoc(usersRef,currentUser).then(()=>{
                const anwersRef = collection(db, `users/${currentUser.phone}`, "quizz")
                const convertedData = Object.assign({}, quizzAnswers)
                console.log('printing converted data')
                console.log(convertedData)
                addDoc (anwersRef,convertedData).then(()=>{
                    setQuizFinish(true)
                }).catch(e => {
                    setDisable(false)
                    console.log(e )})
                
            })

            
        }

    }



    function handleChange(event){
        
        const {name , value } = event.target;

        setAnswer(prevAnswer => {
            return {
                ...prevAnswer ,
                [name] : value
               
            }
        })

    }

  return (quizFinish ? <div> finished </div>: <div style={{backgroundColor:'rgba(255,255,255, 0.85)',flex:1 , height:"80%" ,marginTop:"2%",position:'relative',alignContent:'flex-end',flexDirection:"row" ,borderRadius:"30px"}} className="open-question-card">
  <h2 style={{textAlign:'right',padding:'35px',fontSize:"32px"}}>{questionsBank[currentQuestion]}</h2>
  <textarea name="content"  onChange={handleChange} value={answer.content} id='answer' style={{textAlign:"right",float:"right",position:'relative',padding:'35px' ,marginRight:"1%",width:"94%",borderRadius:"30px",height:"40%" ,fontSize:"16px"}} rows="10" cols="70" placeholder="... اكتب الاجابة هنا "></textarea>
  <button disabled={disable} onClick={nextQuestion} style={{float:"left",padding:"35px" ,marginLeft:"5%" , borderRadius:"30px" ,position:"relative",marginTop:"50px"}} >السؤال التالي</button>
</div>
    
  );
};

export default OpenQuestionCard;














const questionsBank=[
    "ما هي اول صلاة فرضت على الرسول محمد؟" ,"ما أول شيء بناه الله ؟","ما أول ما كتب القلم ؟",
    "من هو الذي كانت تستحي منه ملائكة السماء ؟","ما هو الحج الأصغر ؟" , "من هو الصحابي الذي عاش في الجاهلية 60 عام وفي الاسلام 60 عام؟",
    "ما اسم الصحابي الجليل الذي ورد ذكره في القران؟", "ما اسم السورة التي تحتوي كل اية من اياتها لفظ الجلالة؟",
    "ما اسم الصحابي الذي نزل جبريل على صورته؟"," ما اسم الصحابي الجليل الذي اشتهر بحسن صوته؟",
    "من أول من سمي أحمد ؟"," من أول من قاتل بالسيف ؟","من اول من ولي بيت المال ؟",
    "ما أول جبل وضع في الأرض ؟","من أول داعية اسلامي ؟"," من اول من طاف بالبيت العتيق ؟",
    "ما أول سورة نزلت في مكة المكرمة ؟","من أول من يفيق بعد النفخ في السور ؟",
    "ما أول دار بنيت في مكة ؟","من أول من أدخل عبادة الأصنام ؟","من اول من سل سيف في سبيل الله ؟",
    " من اول جبار في الارض لعنه الله ؟"," من أول من قال أما بعد ؟","من اول من فرش المسجد بالحصبة ؟",
    "من أول من تمنى الموت ؟","ما هو الركن الرابع من أركان الاسلام؟","في أي سنة من الهجرة فرض الصيام؟",
    "في اي شهر من السنة يزورنا شهر رمضان؟","اقصر اية في القران؟","اطول كلمة في القران؟",
    "افضل طعام أشار له القران؟","اكثر أنبياء الله ورد اسمه في القران؟","أكثر فاكهة ذكرت في القران؟",
    "أول طعام ياكله اهل الجنة؟","أكثر الاقوام عناداً مع أنبيائهم؟","اشرف شراب اهل الجنة؟",
    "أغنى شخص ورد اسمه في القران؟","ما هي أركان الصوم؟"," من أول من صام من الأنبياء؟",
    " كم مرة ذكر شهر رمضان في القرآن الكريم؟" ,"ما السورة التي ذُكِر فيها اسم الرمان مرتين؟ ",
    "من هو آخر صحابي توفي من الصحابة؟","من أول من طاف بالبيت العتيق؟","من هو صاحب المقولة الشهيرة، لايضر الشاة سلخها بعد ذبحها؟",
    " ما السورة التي انتهت باسم وقت من أوقات الصلاة؟ "," من أول من ركب الخيل ؟","ما هي الصلاة التي يركع فيها المصلي أربع مرات ويسجد أربع مرات؟",
    "ما أول جيش خرج من المدينة بعد وفاة الرسول صلى الله عليه وسلم؟	"," من أول من قدر الساعات الاثنى عشرة؟",
    "من هو الصحابي الذي اهتز عرش الرحمن لموته؟"," كم آية في القرآن الكريم تحدثت عن الجهاد؟ ",
    " من اول من خط بالقلم ؟","سورة لا تحتوي على حرف الميم في آياتها، فما هي؟","ما هي الحشرة الوحيدة التي أمر الرسول صلى الله عليه وسلم بقتلها؟	",
    "أشقى أهل الارض وأعظمهم عذاباً؟","ما هي الصورة التي لم تبدأ ببسملة؟","ما أول هدية أهديت إلى الرسول صلى الله عليه وسلم بالمدينة ؟ ",
    " ما هو الطائر الذي تكلم كما ذكر في كتاب الله تعالى؟","ماذا يقول الصائم عندما يفطر؟"," كم رمضان صام الرسول صلى الله عليه وسلم؟",
    "رجل اوتي الحكمة ولم يؤت النبوة ؟ ","نبي سميت سورة من القران باسمه، من هو ؟","في أي سورة ذكر شهر رمضان في القرآن؟",
    "ما هي السورة التي افتتحت بالتسبيح وختمت به ؟","في أي سورة تم ذكر اسم نبيين في آخرها ؟",
    "ما هي السورة التي تخلو من حرف الراء ؟","ما هي السورة تالي ذكرت فيها البسملة مرتين ؟","ما هي السورة التي لم تبدأ بالبسملة ؟",
    "ما هي السورة التي ورد لفظ الجلالة ( الله ) في كل آياتها ؟","ما هي السورة القرآنية التي تشفع لمن قرأها ؟",
    "نوع من الشجر ليس له ثماروليس له ظل وليس له أوراق ؟ " ,"شيء يقرص بشدة ولا يمكن أن نراه ؟ ","شيء له أسنان كثيرة ولا يأكل ؟",
    "شيء يكتب ولكن لا يمكنه القراءة أبداً ؟","شيء مليء بالأوراق ولكنه ليس شجرة ؟ ","أين يوجد البحر الذي لا يوجد به ماء ؟ ",
    "شيء إذا وضع على النار تجمد ؟ ","شخص مات رغم أنه لم يولد ؟ ","شيء يمر في الماء دون ان يبتل ؟","شيء كلما زاد نقص ؟ ",
    "أربعة أعداد مجموعهم 15، الأول نصف الثاني، والثاني نصف الثالث، والثالث نصف الرابع. ماهي تلك الأعداد الأربعة..؟",
    "أوجد معادلة حسابية من (ثمانية) أرقام كلها الرقم (6) بحيث يكون الناتج لهذه المعادلة هو (6006)..؟",
    "شجرة تنمو في الغابة ويتضاعف إرتفاعها كل سنة حتى تصل لأقصى إرتفاع لها في العام العاشر كم عام إستغرقت الشجرة للوصول لنصف ارتفاعها الأقصى..؟",
    "في مكتب إحدى الشركات، يوجد ساعتا حائط، إحداهما تدق كل ثلاث ساعات والأخرى تدق كل أربع ساعات بعد كم ساعة تدق الساعتان معاً؟!",
    "أحمد شاب كريم جدا، إشترى صندوق تفاح ومر على سبعة من أصدقائه، وكلما مر على صديق منهم أعطاه نصف ما معه من صندوق التفاح. ولما عاد الى منزله أحمد، وجد ما تبقى معه هو تفاحة واحدة فقط. فكم عدد التفاح الذي كان معه في الصندوق؟",
    "خمس تواريخ  في الشهر عند جمعهم نحصل على المجموع 100؟","في مجلس يوجد به 8 أفراد، وفي نهاية هذا المجلس صافح كل منهم الآخر، فكم عدد مرات المصافحة فيما بينهم؟","شيء دائماً أمامنا ولكن لا أحد يراه؟"
]