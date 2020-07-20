(this["webpackJsonpthe-phonebook"]=this["webpackJsonpthe-phonebook"]||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},19:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(13),c=t.n(o),u=(t(19),t(2)),i=function(e){var n=e.persons,t=e.showFilter,a=e.removeEntry,o=t.toUpperCase();return n.filter((function(e){return e.name.toUpperCase().includes(o)})).map((function(e){return r.a.createElement("li",{key:e.name},e.name," : ",e.number,r.a.createElement("button",{onClick:function(){return a(e)}},"Delete"))}))},l=function(e){var n=e.showFilter,t=e.setShowFilter;return r.a.createElement("div",null,"filter shown with ",r.a.createElement("input",{value:n,onChange:function(e){t(e.target.value)}}))},m=function(e){var n=e.addPerson,t=e.newName,a=e.newNumber,o=e.handleNameChange,c=e.handleNumberChange;return r.a.createElement(r.a.Fragment,null,r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:t,onChange:o})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:a,onChange:c})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add"))))},h=t(3),f=t.n(h),d="/api/persons",s=function(){return f.a.get(d).then((function(e){return e.data}))},b=function(e){return f.a.post(d,e).then((function(e){return e.data}))},p=function(e,n){return f.a.put("".concat(d,"/").concat(e),n).then((function(e){return e.data}))},v=function(e){return f.a.delete("".concat(d,"/").concat(e)).then((function(e){return e.data}))},E=function(){var e=Object(a.useState)([]),n=Object(u.a)(e,2),t=n[0],o=n[1],c=Object(a.useState)(""),h=Object(u.a)(c,2),f=h[0],d=h[1],E=Object(a.useState)(""),w=Object(u.a)(E,2),g=w[0],j=w[1],O=Object(a.useState)(""),C=Object(u.a)(O,2),k=C[0],y=C[1],S=Object(a.useState)(null),N=Object(u.a)(S,2),F=(N[0],N[1]),U=Object(a.useState)(null),D=Object(u.a)(U,2),P=(D[0],D[1]);Object(a.useEffect)((function(){s().then((function(e){o(e)})).catch((function(e){J("Could not restrieve data",!1)}))}),[]);var J=function(e){var n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];F(e),P(n),setTimeout((function(){F(null),P(null)}),8e3)};return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(l,{showFilter:k,setShowFilter:y}),r.a.createElement("h3",null,"add a new"),r.a.createElement(m,{addPerson:function(e){e.preventDefault();var n={name:f,number:g};if(t.some((function(e){return e.name===f}))){var a=t.find((function(e){return e.name===f})),r=Object.assign(a,n);window.confirm("Do you want to update ".concat(f," with new ").concat(g,"?"))&&p(a.id,n).then((function(){o(t.map((function(e){return e.name===f?r:e}))),j(""),j(""),J("User ".concat(f," phone number updated"))})).catch((function(e){J("Update failed. User ".concat(f," has already been removed from the phone book."),!1),o(t.filter((function(e){return e.name!==f})))}))}else{if(t.some((function(e){return e.number===g})))return alert("# ".concat(g," is already in the phone book."),!1);if(""===f||""===g)return alert("The name and number must not be empty",!1);b(n).then((function(e){o(t.concat(e)),d(""),j(""),J("User ".concat(f," has been added to the phone book"))})).catch((function(e){return console.log(e.response.data.error),J("Failed to add number. More about error: ".concat(e.response.data.error),!1)})),s().then((function(e){o(e)})).catch((function(e){return J("Could not retrieve data",!1)}))}b(n).then((function(e){o(t.concat(e)),d(""),j("")}))},newName:f,newNumber:g,handleNameChange:function(e){d(e.target.value)},handleNumberChange:function(e){j(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement("ul",null,r.a.createElement(i,{persons:t,showFilter:k,removeEntry:function(e){window.confirm("Remove ".concat(e.name,"?"))&&v(e.id).then((function(){o(t.filter((function(n){return n.id!==e.id}))),J("".concat(e.name," has been removed from the phone book"))})).catch((function(n){J("Remove failed. User ".concat(e.name," has already been removed from the phone book."),!1),s().then((function(e){o(e)})).catch((function(e){return J("Could not retrieve data",!1)}))}))}})))};c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(E,null)),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.a91a1b63.chunk.js.map