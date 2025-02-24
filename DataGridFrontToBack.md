Como envia los datos el DataGrid
##ordenar -> sort -> multiple
[
	{
		field:"nombre de la columna",
		sort:"asc/desc"
	}
]

##filtrado -> filter -> multiple
[
	{
		field:"nombre de la columna",
		operator:"equals/contains/etc",
		value:"termino de busqueda",
	}
]

##paginacion -> pagination -> una sola
{
 pageSize:5 -> items por pagina
 page:0 -> pagina actual
}

funcionalidad: {
    id: 1,
    nombre: "",
    aplicacion_id: 1,
    apolicacion:{
        
    }
}


ordename por aplicacion

##ordenar -> sort -> multiple
[
	{
		field:"aplicacion",
		sort:"asc/desc"
	}
]

{}